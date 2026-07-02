"use client";

import { useQuery } from "@tanstack/react-query";
import { env } from "~/env";
import type { StatItem } from "../types";

type CountResponse = { meta: { pagination: { total: number } } };

function startOfCurrentWeekISO(): string {
  const d = new Date();
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day; // back to Monday
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d.toISOString();
}

function startOfCurrentMonthISO(): string {
  const d = new Date();
  d.setDate(1);
  d.setHours(0, 0, 0, 0);
  return d.toISOString();
}

async function fetchCount(url: string): Promise<number> {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch count");
  const json = (await res.json()) as CountResponse;
  return json.meta.pagination.total;
}

export const useImpactByNumbers = () => {
  const base = `${env.NEXT_PUBLIC_STRAPI_URL}/api/reports?pagination[pageSize]=1`;

  const { data: total } = useQuery({
    queryKey: ["reports", "count", "total"],
    queryFn: () => fetchCount(base),
  });

  const { data: thisWeek } = useQuery({
    queryKey: ["reports", "count", "week"],
    queryFn: () =>
      fetchCount(
        `${base}&filters[createdAt][$gte]=${encodeURIComponent(startOfCurrentWeekISO())}`,
      ),
  });

  const { data: thisMonth } = useQuery({
    queryKey: ["reports", "count", "month"],
    queryFn: () =>
      fetchCount(
        `${base}&filters[createdAt][$gte]=${encodeURIComponent(startOfCurrentMonthISO())}`,
      ),
  });

  const fmt = (n: number | undefined) =>
    n !== undefined ? n.toLocaleString() : "—";

  const impactByNumbers: StatItem[] = [
    {
      label: "Public reports",
      value: fmt(total),
      trend: thisWeek !== undefined ? `+${thisWeek} this week` : "",
      iconUrl: "/icons/dashboard/document.svg",
      iconBg: "#EFF6FF",
    },
    {
      label: "Reported this week",
      value: fmt(thisWeek),
      trend: "",
      iconUrl: "/icons/dashboard/persons.svg",
      iconBg: "#F5F3FF",
    },
    {
      label: "Reported this month",
      value: fmt(thisMonth),
      trend: "",
      iconUrl: "/icons/dashboard/warning.svg",
      iconBg: "#FFF1F2",
    },
  ];

  return { impactByNumbers };
};
