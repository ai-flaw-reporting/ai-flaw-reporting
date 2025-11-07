/**
 * report controller
 */

import fs from "fs";
import { factories } from "@strapi/strapi";
import type { FlattenedReport } from "../content-types/report/types";
import emailService from "../services/email";
import { flattenReport, reshapeReport } from "../utils/report-helpers";

export default factories.createCoreController(
  "api::report.report",
  ({ strapi }) => ({
    async create(ctx) {
      const MAX_FILE_SIZE = 5 * 1024 * 1024;
      const files = Object.entries(ctx.request?.files || {});
      const emailAttachments = [];
      let attachmentsSize = 0;
      let reportData;

      if (ctx.is("multipart")) {
        reportData =
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
            emailAttachments.push({
              filename: file.originalFilename,
              content: fs.readFileSync(file.filepath).toString("base64"),
              type: file.mimetype,
              disposition: "attachment",
            });
            attachmentsSize += file.size || 0;
          });
      } else {
        reportData = ctx.request.body.data || ctx.request.body;
      }

      const entity = (await strapi.documents("api::report.report").create({
        data: flattenReport(reportData),
      })) as FlattenedReport;

      for await (const [name, data] of files) {
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
          });
      }

      const jsonAttachment = {
        filename: `ai-flaw-report-${entity.documentId}.json`,
        content: Buffer.from(
          JSON.stringify(reportData, null, 2),
          "utf-8",
        ).toString("base64"),
        type: "application/json",
        disposition: "attachment",
      };

      const attachmentsToSend =
        attachmentsSize + Buffer.byteLength(jsonAttachment.content, "utf8") > 10 * 1024 * 1024
          ? [jsonAttachment]
          : [jsonAttachment, ...emailAttachments];

      const response = { data: reshapeReport(entity) };

      const selectedStakeholders = entity.review_selectedStakeholders || [];
      if (selectedStakeholders && selectedStakeholders.length > 0) {
        emailService
          .sendReportEmail(
            strapi,
            response.data,
            selectedStakeholders,
            attachmentsToSend,
          )
          .catch((err) => {
            strapi.log.error(`Failed to send email: ${err.message}`);
          });
      }

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
