"use client";

import React, { useId } from "react";
import { useTheme } from "next-themes";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { Card } from "~/components/ui/card";
import { LINE_CHART_COLORS } from "~/entities/dashboard/model/constants";

import { useReportsOvertime } from "~/entities/dashboard/model/hooks/use-reports-overtime";

export function ReportsOverTime() {
  const uid = useId();
  const titleId = `${uid}-title`;
  const descId = `${uid}-desc`;
  const tableId = `${uid}-table`;
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const { reportsOvertime } = useReportsOvertime();

  return (
    <Card className="border-gray-neutral-200 min-w-[624px] rounded-md p-6 shadow-sm dark:border-gray-500 dark:bg-gray-900">
      <figure
        aria-labelledby={titleId}
        aria-describedby={`${descId} ${tableId}`}
        className="flex flex-col gap-4.5"
      >
        <div className="flex flex-col items-start gap-1.5">
          <div className="flex w-full justify-between text-left">
            <h3
              id={titleId}
              className="text-gray-750 text-xl font-bold dark:text-white"
            >
              Reports Over Time
            </h3>
            <ul className="flex text-sm" aria-label="Series legend">
              <LegendDot color={LINE_CHART_COLORS.public} label="Public" />
              <LegendDot color={LINE_CHART_COLORS.private} label="Private" />
            </ul>
          </div>

          <figcaption
            id={descId}
            className="text-gray-neutral-450 text-xs leading-5 font-normal dark:text-gray-100"
          >
            Monthly trend of AI flaw reports submitted
          </figcaption>
        </div>

        <div
          className="h-[300px] pr-16.5 pl-8.5"
          role="img"
          aria-roledescription="line chart"
          aria-labelledby={titleId}
          aria-describedby={`${descId} ${tableId}`}
        >
          <ResponsiveContainer
            width="100%"
            height="100%"
            className="capitalize"
          >
            <LineChart
              data={reportsOvertime}
              margin={{ left: 8, right: 12, top: 4, bottom: 0 }}
            >
              <CartesianGrid
                stroke={
                  isDark
                    ? LINE_CHART_COLORS.grid.dark
                    : LINE_CHART_COLORS.grid.light
                }
                strokeDasharray="4 4"
                vertical={true}
                aria-hidden="true"
              />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={{
                  stroke: isDark
                    ? LINE_CHART_COLORS.axis.dark
                    : LINE_CHART_COLORS.axis.light,
                }}
                tick={{
                  fill: isDark
                    ? LINE_CHART_COLORS.axis.tick.dark
                    : LINE_CHART_COLORS.axis.tick.light,
                }}
                tickMargin={8}
                interval={0}
                aria-hidden="true"
              />
              <YAxis
                tickLine={false}
                axisLine={{
                  stroke: isDark
                    ? LINE_CHART_COLORS.axis.dark
                    : LINE_CHART_COLORS.axis.light,
                }}
                tick={{
                  fill: isDark
                    ? LINE_CHART_COLORS.axis.tick.dark
                    : LINE_CHART_COLORS.axis.tick.light,
                }}
                tickMargin={8}
                width={36}
                aria-hidden="true"
              />
              <Tooltip
                cursor={{ stroke: "#94A3B8", strokeDasharray: "4 4" }}
                contentStyle={{
                  borderRadius: 8,
                  border: "1px solid #E5E7EB",
                }}
              />
              <Line
                type="monotone"
                dataKey="public"
                name="Public"
                stroke={LINE_CHART_COLORS.public}
                strokeWidth={3}
                dot={{ r: 4, fill: "#fff", strokeWidth: 2 }}
                activeDot={{ r: 6 }}
                aria-hidden="true"
              />
              <Line
                type="monotone"
                dataKey="private"
                name="Private"
                stroke={LINE_CHART_COLORS.private}
                strokeWidth={3}
                dot={{ r: 4, fill: "#fff", strokeWidth: 2 }}
                activeDot={{ r: 6 }}
                aria-hidden="true"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="sr-only" id={tableId} aria-live="polite">
          <table>
            <caption>Tabular data for Reports Over Time</caption>
            <thead>
              <tr>
                <th scope="col">Month</th>
                <th scope="col">Public</th>
                <th scope="col">Private</th>
              </tr>
            </thead>
            <tbody>
              {reportsOvertime.map((d) => (
                <tr key={d.month}>
                  <th scope="row">{d.month}</th>
                  <td>{d.public}</td>
                  <td>{d.private}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </figure>
    </Card>
  );
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <li className="flex min-w-[80px] items-center gap-2">
      <span
        aria-hidden="true"
        className="h-3 w-3 rounded-full"
        style={{ backgroundColor: color }}
      />
      <span className="font-medium">{label}</span>
    </li>
  );
}
