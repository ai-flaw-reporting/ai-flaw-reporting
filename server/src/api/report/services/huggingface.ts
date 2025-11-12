/**
 * Hugging Face Dataset service for report mirroring
 * Commits report data and attachments to a HF dataset repository in atomic operations
 */

import { commit, downloadFile } from "@huggingface/hub";
import type { ReshapedReportData } from "../content-types/report/types";

interface CommitOperation {
  operation: "addOrUpdate";
  path: string;
  content: Blob;
}

export default {
  /**
   * Get repository configuration
   */
  getRepoConfig() {
    const accessToken = process.env.HF_ACCESS_TOKEN;
    const repoId = process.env.HF_DATASET_REPO;

    if (!accessToken) {
      throw new Error("HF_ACCESS_TOKEN environment variable is required");
    }
    if (!repoId) {
      throw new Error("HF_DATASET_REPO environment variable is required");
    }

    return {
      repo: {
        name: repoId,
        type: "dataset" as const,
      },
      accessToken,
    };
  },

  /**
   * Commit report data and attachments to HF dataset repository
   * All files are committed in a single atomic operation
   */
  async commitReport(
    strapi: any,
    reportData: ReshapedReportData,
    attachments: Array<{
      filename: string;
      content: Buffer;
      type: string;
    }> = [],
  ) {
    const { repo, accessToken } = this.getRepoConfig();
    const documentId = reportData.documentId;
    const operations: CommitOperation[] = [];

    strapi.log.info(`Starting HF commit for report ${documentId}`);

    const reportJson = {
      form_data: reportData,
      machine_readable: null,
      timestamp: new Date().toISOString(),
    };

    operations.push({
      operation: "addOrUpdate",
      path: `reports/${documentId}.json`,
      content: new Blob([JSON.stringify(reportJson, null, 2)], {
        type: "application/json",
      }),
    });

    for (const attachment of attachments) {
      operations.push({
        operation: "addOrUpdate",
        path: `uploads/${documentId}_${attachment.filename}`,
        content: new Blob([attachment.content], { type: attachment.type }),
      });
    }

    const indexPath = "reports_index.json";
    let reportIndex: any[] = [];

    try {
      const existingIndex = await downloadFile({
        repo,
        accessToken,
        path: indexPath,
      });

      if (existingIndex) {
        const indexText = await existingIndex.text();
        reportIndex = JSON.parse(indexText);
      }
    } catch (error) {
      strapi.log.info("Creating new index file");
    }

    const existingReportIndex = reportIndex.findIndex((r) => r.report_id === documentId);
    const reportTypes = reportData.metadata?.reportType ? [reportData.metadata.reportType] : [];
    const reporterId =
      reportData.reporterDetails?.reporter?.email ||
      reportData.reporterDetails?.reporter?.org ||
      "Anonymous";

    const indexEntry = {
      report_id: documentId,
      report_status: "New",
      report_types: reportTypes,
      reporter_id: reporterId,
      submission_timestamp: reportData.metadata.createdAt,
      file_path: `reports/${documentId}.json`,
    };

    if (existingReportIndex !== -1) {
      reportIndex[existingReportIndex] = indexEntry;
    } else {
      reportIndex.push(indexEntry);
    }

    operations.push({
      operation: "addOrUpdate",
      path: indexPath,
      content: new Blob([JSON.stringify(reportIndex, null, 2)], {
        type: "application/json",
      }),
    });

    const commitResult = await commit({
      repo,
      accessToken,
      title: `Add report ${documentId}`,
      description: `Automated commit from Strapi - ${new Date().toISOString()}`,
      operations,
    });

    strapi.log.info(
      `Successfully committed report ${documentId} to HF dataset. Commit: ${commitResult.commit.oid}`,
    );

    return commitResult;
  },
};
