"use client";

import { useQuery } from "@tanstack/react-query";
import { env } from "~/env";
import type { RecentReportItem } from "../types";

type StrapiSystem = { model: string; platform: string };
type StrapiReport = {
  id: number;
  createdAt: string;
  incidentDescription: { issueDescription?: string };
  reporterDetails: { systems: StrapiSystem[] };
  impactAssessment: { severityOfHarm?: string; harmType?: string; harmTypes?: string[] };
};
type StrapiResponse = {
  data: StrapiReport[];
  meta: { pagination: { total: number } };
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function humanize(s: string) {
  return s.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function toRecentReportItem(r: StrapiReport): RecentReportItem {
  const system = r.reporterDetails.systems[0];
  const desc = r.incidentDescription.issueDescription ?? "";
  const rawCategory =
    r.impactAssessment.harmTypes?.[0] ?? r.impactAssessment.harmType ?? "";

  return {
    reportId: `FLR-${r.id}`,
    title: desc.length > 55 ? desc.slice(0, 55) + "…" : desc || "Untitled",
    system: system?.model ?? "Unknown",
    category: rawCategory ? humanize(rawCategory) : "Other",
    severity: r.impactAssessment.severityOfHarm ?? "Low",
    status: "Submitted",
    reported: formatDate(r.createdAt),
  };
}

export const useRecentReports = () => {
  const { data } = useQuery<StrapiResponse>({
    queryKey: ["reports", "recent"],
    queryFn: async () => {
      const res = await fetch(
        `${env.NEXT_PUBLIC_STRAPI_URL}/api/reports?pagination[pageSize]=10&sort=createdAt:desc`,
      );
      if (!res.ok) throw new Error("Failed to fetch reports");
      return res.json() as Promise<StrapiResponse>;
    },
  });

  const recentReports: RecentReportItem[] = (data?.data ?? []).map(toRecentReportItem);
  const total = data?.meta.pagination.total ?? 0;
  const columns: (keyof RecentReportItem)[] = [
    "reportId", "title", "system", "category", "severity", "status", "reported",
  ];

  return { recentReports, total: total.toLocaleString(), columns, pageSize: 10 };
};
