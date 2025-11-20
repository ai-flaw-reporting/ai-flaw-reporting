"use client";

import React, { useId } from "react";
import { Card } from "~/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useIssueCategories } from "~/entities/dashboard/model/hooks/use-issue-categories";

export function IssueCategories() {
  const uid = useId();
  const titleId = `${uid}-title`;
  const descId = `${uid}-desc`;
  const tableId = `${uid}-table`;

  const { issueCategories } = useIssueCategories();

  return (
    <Card className="border-gray-neutral-200 rounded-md p-6 shadow-sm dark:border-gray-500 dark:bg-gray-900">
      <figure
        aria-labelledby={titleId}
        aria-describedby={`${descId} ${tableId}`}
        className="flex flex-col gap-6"
      >
        <div className="space-y-1.5 text-left">
          <h3
            id={titleId}
            className="text-gray-750 text-xl font-bold dark:text-white"
          >
            Issue Categories
          </h3>
          <figcaption
            id={descId}
            className="text-gray-neutral-450 text-xs leading-5 font-normal dark:text-gray-100"
          >
            Distribution of AI flaw types reported
          </figcaption>
        </div>

        <div className="flex flex-row gap-6">
          <div
            className="h-[300px] w-[400px]"
            role="img"
            aria-roledescription="donut chart"
            aria-labelledby={titleId}
            aria-describedby={`${descId} ${tableId}`}
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={issueCategories}
                  dataKey="value"
                  nameKey="label"
                  innerRadius={80}
                  outerRadius={120}
                  startAngle={90}
                  endAngle={-270}
                  paddingAngle={0}
                  strokeWidth={0}
                  aria-hidden="true"
                >
                  {issueCategories.map((s) => (
                    <Cell key={s.label} fill={s.color} aria-hidden="true" />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          <ul
            className="flex flex-col justify-center space-y-2 max-h-[260px] overflow-y-auto pr-2"
            aria-label="Categories legend"
          >
            {issueCategories.map((s) => (
              <li key={s.label} className="flex items-center gap-3">
                <span
                  className="h-4 w-4 shrink-0 rounded-full"
                  style={{ backgroundColor: s.color }}
                  aria-hidden="true"
                />
                <div className="text-start">
                  <p className="text-gray-750 text-sm font-normal capitalize dark:text-white">
                    {s.label}
                  </p>
                  <p className="text-gray-neutral-450 text-xs font-normal dark:text-gray-100">
                    {s.value}% of reports
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="sr-only" id={tableId} aria-live="polite">
          <table>
            <caption>Tabular data for Issue Categories donut chart</caption>
            <thead>
              <tr>
                <th scope="col">Category</th>
                <th scope="col">Percent of reports</th>
              </tr>
            </thead>
            <tbody>
              {issueCategories.map((s) => (
                <tr key={s.label}>
                  <th scope="row">{s.label}</th>
                  <td>{s.value}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </figure>
    </Card>
  );
}
