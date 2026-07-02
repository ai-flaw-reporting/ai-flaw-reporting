/**
 * report controller
 */

import fs from "fs";
import { factories } from "@strapi/strapi";
import type { FlattenedReport } from "../content-types/report/types";
import certService from "../services/cert";
import emailService from "../services/email";
import huggingfaceService from "../services/huggingface";
import n8nService from "../services/n8n";
import { flattenReport, reshapeReport } from "../utils/report-helpers";

export default factories.createCoreController(
  "api::report.report",
  ({ strapi }) => ({
    async create(ctx) {
      const MAX_FILE_SIZE = 5 * 1024 * 1024;
      const files = Object.entries(ctx.request?.files || {});
      const emailAttachments = [];
      const hfAttachments = [];
      const uploads = [];
      let attachmentsSize = 0;
      let payload;

      if (ctx.is("multipart")) {
        payload =
          typeof ctx.request.body.data === "string"
            ? JSON.parse(ctx.request.body.data)
            : ctx.request.body.data;

        files
          .flatMap(([name, data]) => (Array.isArray(data) ? data : [data]))
          .forEach((file) => {
            if (file.size > MAX_FILE_SIZE) {
              ctx.throw(
                400,
                `File "${file.originalFilename}" exceeds the maximum size of 5MB (${(file.size / (1024 * 1024)).toFixed(2)}MB)`,
              );
            }

            const fileBuffer = fs.readFileSync(file.filepath);

            emailAttachments.push({
              filename: file.originalFilename,
              content: fileBuffer.toString("base64"),
              type: file.mimetype,
              disposition: "attachment",
            });

            hfAttachments.push({
              filename: file.originalFilename,
              content: fileBuffer,
              type: file.mimetype,
            });

            attachmentsSize += file.size || 0;
          });
      } else {
        payload = ctx.request.body.data || ctx.request.body;
      }

      const entity = (await strapi.documents("api::report.report").create({
        data: flattenReport(payload),
      })) as FlattenedReport;

      for await (const [name, data] of files) {
        uploads.push(
          await strapi.plugins.upload.services.upload
            .upload({
              data: {
                refId: entity.id,
                ref: "api::report.report",
                field: name,
              },
              files: Array.isArray(data) ? data : [data],
            })
            .catch((uploadErr) => {
              strapi.log.error(
                `Failed to upload files for field ${name}: ${uploadErr.message}`,
              );
            }),
        );
      }

      const jsonAttachment = {
        filename: `ai-flaw-report-${entity.documentId}.json`,
        content: Buffer.from(JSON.stringify(payload, null, 2), "utf-8").toString("base64"),
        type: "application/json",
        disposition: "attachment",
      };

      const attachmentsToSend =
        attachmentsSize + Buffer.byteLength(jsonAttachment.content, "utf8") > 10 * 1024 * 1024
          ? [jsonAttachment]
          : [jsonAttachment, ...emailAttachments];

      const response = { data: reshapeReport(entity) };

      const selectedStakeholders = payload?.reviewReport?.selectedStakeholders || [];
      strapi.log.info(`Selected stakeholders: ${JSON.stringify(selectedStakeholders)}`);
      if (selectedStakeholders && selectedStakeholders.length > 0) {
        void emailService
          .sendReportEmail(
            strapi,
            response.data,
            selectedStakeholders,
            attachmentsToSend,
          )
          .catch((err) => {
            strapi.log.error(`Failed to send report email: ${JSON.stringify(err)}`);
          });
      } else {
        strapi.log.warn(`No stakeholders selected, skipping report email.`);
      }

      const reporterEmail = payload?.reporterDetails?.reporter?.email;
      if (reporterEmail) {
        void emailService
          .sendConfirmationEmail(
            strapi,
            reporterEmail,
            entity.documentId,
            response.data.metadata?.reportType ?? "Unknown",
          )
          .catch((err) => {
            strapi.log.error(`Failed to send confirmation email: ${err.message}`);
          });
      }

      if (selectedStakeholders.includes("CERT")) {
        void certService
          .submitReport(strapi, response.data, hfAttachments)
          .catch((err) => {
            strapi.log.error(
              `Failed to submit report to CERT/VINCE: ${err instanceof Error ? err.message : JSON.stringify(err)}`,
            );
          });
      }

      // void huggingfaceService
      //   .commitReport(strapi, response.data, hfAttachments)
      //   .catch((err) => {
      //     strapi.log.error(
      //       `Failed to mirror report to HF dataset: ${JSON.stringify(err)}`,
      //     );
      //   });

      void huggingfaceService
        .commitDemoData(strapi, response.data, selectedStakeholders)
        .catch((err) => {
          strapi.log.error(
            `Failed to commit demo data to HF: ${JSON.stringify(err)}`,
          );
        });

      void n8nService
        .sendReportToWebhook(strapi, response.data, uploads)
        .catch((err) => {
          strapi.log.error(
            `Failed to send report to N8N webhook: ${err instanceof Error ? err.message : JSON.stringify(err)}`,
          );
        });

      return response;
    },

    async find(ctx) {
      const response = await super.find(ctx);

      if (response.data) {
        response.data = response.data.map(reshapeReport);
      }

      return response;
    },

    async findOne(ctx) {
      const response = await super.findOne(ctx);

      if (response.data) {
        response.data = reshapeReport(response.data);
      }

      return response;
    },
  }),
);
