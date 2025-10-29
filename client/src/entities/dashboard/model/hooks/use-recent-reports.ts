import data from "~/entities/dashboard/model/public-reports.json";
import type { RecentReportItem } from "../types";

export const useRecentReports = () => {
  const recentReports = data.data as RecentReportItem[];
  const pageSize = data.pageSize;
  const total = data.total;

  const columns = Object.keys(recentReports[0]!);

  return { recentReports, pageSize, total, columns };
};
