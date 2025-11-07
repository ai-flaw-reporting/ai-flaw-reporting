/**
 * Email notification service for AI Flaw Reports
 */

import type { ReshapedReportData } from "../content-types/report/types";

const EMAIL_MAPPING = {
  OpenAI: "placeholder@openai.com",
  Anthropic: "usersafety@anthropic.com",
  Google: "placeholder@google.com",
  Cohere: "security@cohere.com",
  "AI Incident Database": null,
  "AI Safety Institute": null,
  AVID: null,
  AIID: null,
  "General AI Flaw Database": null,
  "Other Organizations": null,
};

export default {
  generateEmailBody(): string {
    return `Dear team,

A new AI system incident report has been submitted via the AI Flaw Reporting portal.

The full form submission is attached as a JSON file. Any uploaded evidence (e.g. screenshots, logs) is also attached to this email.

Please refer to the JSON for complete impact, discovery, and policy violation details.

Thank you,
AI Flaw Reporting Automation`;
  },

  /**
   * Send report notification emails
   */
  async sendReportEmail(
    strapi: any,
    reportData: ReshapedReportData,
    providers: string[],
    attachments: {
      filename: string;
      content: string;
      type: string;
    }[] = [],
  ) {
    let recipients = providers
      .map((stakeholder) => EMAIL_MAPPING[stakeholder])
      .filter((email: string) => !!email);

    if (recipients.length === 0) {
      strapi.log.warn("No recipients found. Skipping email notifications.");
      return;
    }

    // IS_TEST_ENV because free strapi has only production environment
    if (
      (process.env.NODE_ENV !== "production" || !!process.env.IS_TEST_ENV) &&
      reportData.reporterDetails?.reporter?.email
    ) {
      recipients = [reportData.reporterDetails?.reporter?.email];
    }

    const text = this.generateEmailBody();
    const subject = `New AI Incident Report Submitted — ${reportData.documentId} (${reportData.metadata.reportType})`;

    await strapi.plugins.email.services.email
      .send({
        to: recipients,
        subject,
        text,
        attachments,
      })
      .catch((error: any) => {
        strapi.log.error(
          `Failed to send email to ${recipients.join(", ")}`,
        );
        throw error;
      });
  },
};
