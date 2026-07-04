/**
 * Email notification service for AI Flaw Reports
 */

import type { ReshapedReportData } from "../content-types/report/types";

type EmailTarget = { to: string; cc?: string[] } | null;

const EMAIL_MAPPING: Record<string, EmailTarget> = {
  OpenAI: { to: "zhu.lae@northeastern.edu" },
  Anthropic: { to: "usersafety@anthropic.com" },
  Google: { to: "zhu.lae@northeastern.edu" },
  Cohere: { to: "security@cohere.com" },
  "Hugging Face": { to: "safety@huggingface.co" },
  OECD: { to: "ai@oecd.org", cc: ["luis.aranda@oecd.org", "benedicte.rispal@oecd.org"] },
  "AI Incident Database": null,
  "UK AI Security": null,
  "NIST AI Risk Management": null,
  CISA: null,
  CERT: null,
  AVID: null,
};

export default {
  generateEmailBody(): string {
    return `Dear team,

A new AI system incident report has been submitted via the AI Flaw Reporting portal.

The full form submission is attached as a JSON file. Any uploaded evidence (e.g. screenshots, logs) is also attached to this email.

Please refer to the JSON for complete impact, discovery, and policy violation details.

If you decide to inform FLARE-AI whether you have addressed this flaw, please email contact@ai-reports.org with the report ID and let us know for record keeping purposes. Note that we do not store the contents of the actual report, but we maintain a record of the report ID and the organization the report was sent to.

Thank you,
FLARE-AI Team

---
Note: This email was sent from a research preview version of the FLARE-AI platform. If you have any feedback, please send it to contact@ai-reports.org.`;
  },

  generateConfirmationBody(documentId: string, reportType: string): string {
    return `Thank you for submitting your report.

Your submission has been received and assigned the following ID for your records:

  Report ID: ${documentId}
  Report Type: ${reportType}

We will review your report and follow up if we need any additional information. If you selected organizations to notify, they have been contacted on your behalf.

You can reference this Report ID in any future correspondence.

Thank you,
FLARE-AI Team

---
Note: This email was sent from a demo version of the FLARE-AI platform. If you have any feedback, please send it to contact@ai-reports.org.`;
  },

  /**
   * Send confirmation email to the reporter
   */
  async sendConfirmationEmail(
    strapi: any,
    reporterEmail: string,
    documentId: string,
    reportType: string,
  ) {
    if (!reporterEmail) {
      strapi.log.warn("No reporter email provided, skipping confirmation email.");
      return;
    }

    const subject = `Your AI Flaw Report Has Been Received — ${documentId}`;
    const text = this.generateConfirmationBody(documentId, reportType);

    await strapi.plugins.email.services.email
      .send({
        to: reporterEmail,
        from: process.env.EMAIL_DEFAULT_FROM,
        subject,
        text,
      })
      .catch((error: any) => {
        strapi.log.error(
          `Failed to send confirmation email to ${reporterEmail}: ${JSON.stringify(error)}`,
        );
        throw error;
      });

    strapi.log.info(`Confirmation email sent to ${reporterEmail}.`);
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
    const targets = providers
      .map((stakeholder) => EMAIL_MAPPING[stakeholder])
      .filter((t): t is NonNullable<EmailTarget> => !!t);

    strapi.log.info(`Report email targets before override: ${JSON.stringify(targets)}`);

    if (targets.length === 0) {
      strapi.log.warn("No recipients found. Skipping email notifications.");
      return;
    }

    let toAddresses = targets.map((t) => t.to);
    let ccAddresses = targets.flatMap((t) => t.cc ?? []);

    // IS_TEST_ENV because free strapi has only production environment
    if (
      (process.env.NODE_ENV !== "production" || !!process.env.IS_TEST_ENV) &&
      reportData.reporterDetails?.reporter?.email
    ) {
      toAddresses = [reportData.reporterDetails.reporter.email];
      ccAddresses = [];
    }

    strapi.log.info(`Sending report email to: ${JSON.stringify(toAddresses)}, cc: ${JSON.stringify(ccAddresses)}`);

    const text = this.generateEmailBody();
    const subject = `New AI Incident Report Submitted — ${reportData.documentId} (${reportData.metadata.reportType})`;

    await strapi.plugins.email.services.email
      .send({
        to: toAddresses,
        ...(ccAddresses.length > 0 && { cc: ccAddresses }),
        from: process.env.EMAIL_DEFAULT_FROM,
        subject,
        text,
        attachments,
      })
      .catch((error: any) => {
        strapi.log.error(
          `Failed to send email to ${toAddresses.join(", ")}, error: ${JSON.stringify(error)}`,
        );
        throw error;
      });
      strapi.log.info(`Email successfully sent to ${toAddresses.join(", ")}.`);
  },
};
