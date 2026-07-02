"use client";

import { useQuery } from "@tanstack/react-query";
import { env } from "~/env";
import fallback from "~/entities/dashboard/model/reports-overtime.json";
import type { ReportOvertime } from "../types";

type StrapiReport = { createdAt: string };
type StrapiResponse = { data: StrapiReport[] };

export const useReportsOvertime = () => {
  const { data } = useQuery<StrapiResponse>({
    queryKey: ["reports", "overtime"],
    queryFn: async () => {
      const res = await fetch(
        `${env.NEXT_PUBLIC_STRAPI_URL}/api/reports?pagination[pageSize]=1000&sort=createdAt:asc`,
      );
      if (!res.ok) throw new Error("Failed to fetch reports over time");
      return res.json() as Promise<StrapiResponse>;
    },
  });

  if (!data?.data.length) {
    return { reportsOvertime: fallback as ReportOvertime[] };
  }

  // Build a map of the last 12 months initialised to 0
  const now = new Date();
  const monthMap: Record<string, number> = {};
  for (let i = 11; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
    monthMap[key] = 0;
  }

  for (const report of data.data) {
    const d = new Date(report.createdAt);
    const key = d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
    if (key in monthMap) monthMap[key] = (monthMap[key] ?? 0) + 1;
  }

  const reportsOvertime: ReportOvertime[] = Object.entries(monthMap).map(
    ([month, count]) => ({ month, public: count, private: 0 }),
  );

  return { reportsOvertime };
};
