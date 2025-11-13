/**
 * N8N Webhook service for report notifications
 * Sends report data to N8N webhook when a new report is created
 */

import type { ReshapedReportData } from "../content-types/report/types";

export default {
  /**
   * Send report data to N8N webhook
   */
  async sendReportToWebhook(
    strapi: any,
    report: ReshapedReportData,
    uploads = [],
  ) {
    const webhookUrl = process.env.N8N_WEBHOOK_URL;

    if (!webhookUrl) {
      strapi.log.warn("N8N_WEBHOOK_URL not configured, skipping webhook");
      return;
    }

    const payload = {
      entry: "report",
      entryId: report.id,
      entryData: report,
      uploads,
    };

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(
        `N8N webhook responded with status ${response.status}: ${await response.text()}`,
      );
    }

    strapi.log.info(
      `Successfully sent report ${report.documentId} to N8N webhook`,
    );

    return {
      success: true,
      statusCode: response.status,
    };
  },
};
