import data from "~/entities/dashboard/model/reports-overtime.json";
import type { ReportOvertime } from "../types";

export const useReportsOvertime = () => {
  const reportsOvertime = data as ReportOvertime[];

  return { reportsOvertime };
};
