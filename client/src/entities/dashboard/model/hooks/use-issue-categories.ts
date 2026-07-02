"use client";

import { useQuery } from "@tanstack/react-query";
import { env } from "~/env";
import fallback from "~/entities/dashboard/model/issue-categories.json";
import type { IssueCategory } from "../types";

type StrapiReport = {
  impactAssessment: { harmType?: string; harmTypes?: string[] };
};
type StrapiResponse = { data: StrapiReport[] };

function humanize(s: string) {
  return s.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export const useIssueCategories = () => {
  const { data } = useQuery<StrapiResponse>({
    queryKey: ["reports", "categories"],
    queryFn: async () => {
      const res = await fetch(
        `${env.NEXT_PUBLIC_STRAPI_URL}/api/reports?pagination[pageSize]=1000&sort=createdAt:desc`,
      );
      if (!res.ok) throw new Error("Failed to fetch categories");
      return res.json() as Promise<StrapiResponse>;
    },
  });

  if (!data?.data.length) {
    return { issueCategories: fallback as IssueCategory[] };
  }

  const counts: Record<string, number> = {};
  for (const report of data.data) {
    const types = report.impactAssessment.harmTypes?.length
      ? report.impactAssessment.harmTypes
      : report.impactAssessment.harmType
        ? [report.impactAssessment.harmType]
        : [];
    for (const t of types) {
      if (t) counts[t] = (counts[t] ?? 0) + 1;
    }
  }

  const issueCategories: IssueCategory[] = Object.entries(counts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 6)
    .map(([label, value]) => ({ label: humanize(label), value }));

  return {
    issueCategories: issueCategories.length
      ? issueCategories
      : (fallback as IssueCategory[]),
  };
};
