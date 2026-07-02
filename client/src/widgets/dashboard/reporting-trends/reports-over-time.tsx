"use client";

import React, { useId } from "react";
import { useTheme } from "next-themes";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { Card } from "~/components/ui/card";
import { LINE_CHART_COLORS } from "~/entities/dashboard/model/constants";
import { useMediaQuery } from "~/lib/hooks/use-media-query";
import { useReportsOvertime } from "~/entities/dashboard/model/hooks/use-reports-overtime";

export function ReportsOverTime() {
  const uid = useId();
  const titleId = `${uid}-title`;
  const descId = `${uid}-desc`;
  const tableId = `${uid}-table`;
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const isMobile = useMediaQuery("(max-width: 1023px)");

  const { reportsOvertime } = useReportsOvertime();

  return (
    <Card className="border-gray-200 w-full rounded-xl p-6 shadow-sm lg:min-w-0 lg:flex-1 dark:border-gray-700 dark:bg-gray-800">
      <figure
        aria-labelledby={titleId}
        aria-describedby={`${descId} ${tableId}`}
        className="flex h-full flex-col gap-5"
      >
        <div className="flex items-start justify-between">
          <div className="space-y-0.5">
            <h3
              id={titleId}
              className="text-gray-750 text-lg font-bold dark:text-white"
            >
              Reporting trends
            </h3>
            <figcaption
              id={descId}
              className="text-gray-neutral-450 text-xs font-normal dark:text-gray-400"
            >
              Reports per month &middot; last 12 months
            </figcaption>
          </div>
          <button className="rounded-md border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700">
            Last 90 days
          </button>
        </div>

        <div
          className="min-h-0 flex-1"
          role="img"
          aria-roledescription="area chart"
          aria-labelledby={titleId}
          aria-describedby={`${descId} ${tableId}`}
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={reportsOvertime}
              margin={{
                left: 0,
                right: 8,
                top: 4,
                bottom: isMobile ? 16 : 0,
              }}
            >
              <defs>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor={LINE_CHART_COLORS.public}
                    stopOpacity={0.12}
                  />
                  <stop
                    offset="95%"
                    stopColor={LINE_CHART_COLORS.public}
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                stroke={
                  isDark
                    ? LINE_CHART_COLORS.grid.dark
                    : LINE_CHART_COLORS.grid.light
                }
                strokeDasharray="4 4"
                vertical={false}
                aria-hidden="true"
              />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tick={{
                  fill: isDark
                    ? LINE_CHART_COLORS.axis.tick.dark
                    : LINE_CHART_COLORS.axis.tick.light,
                  fontSize: 11,
                }}
                tickMargin={isMobile ? 12 : 8}
                interval={0}
                angle={isMobile ? -45 : 0}
                textAnchor={isMobile ? "end" : "middle"}
                height={isMobile ? 50 : 30}
                tickFormatter={(value: string) => value.slice(0, 3)}
                aria-hidden="true"
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{
                  fill: isDark
                    ? LINE_CHART_COLORS.axis.tick.dark
                    : LINE_CHART_COLORS.axis.tick.light,
                  fontSize: 11,
                }}
                tickMargin={4}
                width={32}
                aria-hidden="true"
              />
              <Tooltip
                cursor={{ stroke: "#94A3B8", strokeDasharray: "4 4" }}
                contentStyle={{
                  borderRadius: 8,
                  border: "1px solid #E5E7EB",
                  fontSize: 12,
                }}
              />
              <Area
                type="monotone"
                dataKey="public"
                name="Reports"
                stroke={LINE_CHART_COLORS.public}
                strokeWidth={2}
                fill="url(#areaGradient)"
                dot={{
                  r: 3,
                  fill: "#fff",
                  strokeWidth: 1.5,
                  stroke: LINE_CHART_COLORS.public,
                }}
                activeDot={{ r: 5 }}
                aria-hidden="true"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="sr-only" id={tableId} aria-live="polite">
          <table>
            <caption>Tabular data for Reporting Trends</caption>
            <thead>
              <tr>
                <th scope="col">Month</th>
                <th scope="col">Reports</th>
              </tr>
            </thead>
            <tbody>
              {reportsOvertime.map((d) => (
                <tr key={d.month}>
                  <th scope="row">{d.month}</th>
                  <td>{d.public}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </figure>
    </Card>
  );
}
