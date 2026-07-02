/**
 * CERT/VINCE API service for automated vulnerability report submission
 */

import archiver from "archiver";
import type { ReshapedReportData } from "../content-types/report/types";
import { convertToCertObject } from "../utils/cert-converter";

export type CertAttachment = {
  filename: string;
  content: Buffer;
  type: string;
};

const MAX_RETRIES = 3;
const INITIAL_BACKOFF_MS = 1000;

function createZipBuffer(attachments: CertAttachment[]): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const archive = archiver("zip", { zlib: { level: 9 } });
    const chunks: Buffer[] = [];

    archive.on("data", (chunk: Buffer) => chunks.push(chunk));
    archive.on("end", () => resolve(Buffer.concat(chunks)));
    archive.on("error", reject);

    for (const attachment of attachments) {
      archive.append(attachment.content, { name: attachment.filename });
    }

    archive.finalize();
  });
}

export default {
  async submitReport(
    strapi: any,
    reportData: ReshapedReportData,
    attachments: CertAttachment[] = [],
  ) {
    const apiUrl = process.env.VINCE_API_URL;
    const apiKey = process.env.VINCE_API_KEY;
    if (!apiUrl || !apiKey) {
      strapi.log.warn(
        "VINCE_API_URL or VINCE_API_KEY not configured, skipping CERT dispatch",
      );
      return;
    }

    const vinceData = convertToCertObject(reportData);
    const formData = new FormData();

    for (const [key, value] of Object.entries(vinceData)) {
      if (key === "user_file") continue;

      if (typeof value === "boolean") {
        formData.append(key, value ? "True" : "False");
      } else if (value === null || value === undefined) {
        formData.append(key, "");
      } else {
        formData.append(key, String(value));
      }
    }

    if (attachments.length > 0) {
      const zipBuffer = await createZipBuffer(attachments);
      const zipBlob = new Blob([zipBuffer], { type: "application/zip" });
      formData.append(
        "user_file",
        zipBlob,
        `attachments-${reportData.documentId}.zip`,
      );
    }

    return this.postWithRetry(
      strapi,
      apiUrl,
      apiKey,
      formData,
      reportData.documentId,
    );
  },

  async postWithRetry(
    strapi: any,
    url: string,
    apiKey: string,
    formData: FormData,
    documentId: string,
    attempt = 1,
  ): Promise<{ success: boolean; statusCode: number }> {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Token ${apiKey}`,
      },
      body: formData,
    });

    if (response.ok) {
      strapi.log.info(
        `CERT/VINCE report ${documentId} submitted successfully (status ${response.status})`,
      );
      return { success: true, statusCode: response.status };
    }

    if (response.status === 429 && attempt < MAX_RETRIES) {
      const backoff = INITIAL_BACKOFF_MS * Math.pow(2, attempt - 1);
      strapi.log.warn(
        `CERT/VINCE rate limited (429). Retry ${attempt}/${MAX_RETRIES} after ${backoff}ms`,
      );
      await new Promise((resolve) => setTimeout(resolve, backoff));
      return this.postWithRetry(
        strapi,
        url,
        apiKey,
        formData,
        documentId,
        attempt + 1,
      );
    }

    const body = await response.text().catch(() => "");
    throw new Error(
      `CERT/VINCE API responded with status ${response.status}: ${body}`,
    );
  },
};
