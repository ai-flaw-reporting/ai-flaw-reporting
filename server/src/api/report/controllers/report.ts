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
      let reportData;
      const files = ctx.request?.files || {};
      const emailAttachments = [];

      if (ctx.is("multipart")) {
        reportData =
          typeof ctx.request.body.data === "string"
            ? JSON.parse(ctx.request.body.data)
            : ctx.request.body.data;
      } else {
        reportData = ctx.request.body.data || ctx.request.body;
      }

      const entity = await strapi.documents("api::report.report").create({
        data: flattenReport(reportData),
      }) as FlattenedReport;

      if (Object.keys(files).length > 0) {
        for (const [fieldName, fileData] of Object.entries(files)) {
          try {
            const filesArray = Array.isArray(fileData) ? fileData : [fileData];

            await strapi.plugins.upload.services.upload.upload({
              data: {
                refId: entity.id,
                ref: "api::report.report",
                field: fieldName,
              },
              files: filesArray,
            });

            filesArray.forEach((file) =>
              emailAttachments.push({
                filename: file.originalFilename,
                content: fs.readFileSync(file.filepath).toString("base64"),
                contentType: file.mimetype,
                size: file.size,
              }),
            );
          } catch (uploadErr) {
            strapi.log.error(
              `Failed to upload files for field ${fieldName}: ${uploadErr.message}`,
            );
          }
        }
      }

      const attachmentsSize = emailAttachments.reduce((acc, curr) => acc + (curr.size || 0), 0);

      const jsonAttachment = {
        filename: `ai-flaw-report-${entity.documentId}.json`,
        content: Buffer.from(
          JSON.stringify(reportData, null, 2),
          "utf-8",
        ).toString("base64"),
        contentType: "application/json",
      };

      const attachmentsToSend =
        attachmentsSize + Buffer.byteLength(jsonAttachment.content, "utf8") > 10 * 1024 * 1024
          ? [jsonAttachment]
          : [jsonAttachment, ...emailAttachments];

      const selectedStakeholders = entity.review_selectedStakeholders || [];
      if (selectedStakeholders && selectedStakeholders.length > 0) {
        emailService
          .sendReportEmail(
            strapi,
            reportData,
            selectedStakeholders,
            attachmentsToSend,
          )
          .catch((err) => {
            strapi.log.error(`Failed to send email: ${err.message}` );
          });
      }

      return { data: reshapeReport(entity) };
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
