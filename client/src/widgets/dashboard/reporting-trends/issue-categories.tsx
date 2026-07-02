"use client";

import React, { useId } from "react";
import { Card } from "~/components/ui/card";
import { useIssueCategories } from "~/entities/dashboard/model/hooks/use-issue-categories";

export function IssueCategories() {
  const uid = useId();
  const titleId = `${uid}-title`;

  const { issueCategories } = useIssueCategories();

  const maxValue = Math.max(...issueCategories.map((c) => c.value));

  return (
    <Card className="border-gray-200 flex w-full flex-col rounded-xl p-6 shadow-sm lg:min-w-0 lg:flex-1 dark:border-gray-700 dark:bg-gray-800">
      <div className="mb-6 space-y-0.5">
        <h3
          id={titleId}
          className="text-gray-750 text-lg font-bold dark:text-white"
        >
          By category
        </h3>
        <p className="text-gray-neutral-450 text-xs font-normal dark:text-gray-400">
          Top issue types
        </p>
      </div>

      <ul
        className="flex flex-1 flex-col justify-between gap-4 overflow-y-auto"
        aria-labelledby={titleId}
      >
        {issueCategories.map((category) => (
          <li key={category.label} className="space-y-1.5">
            <div className="flex items-baseline justify-between gap-4 text-sm">
              <span className="text-gray-700 dark:text-gray-200">
                {category.label}
              </span>
              <span className="shrink-0 font-medium text-gray-500 dark:text-gray-400">
                {category.value.toLocaleString()}
              </span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-gray-100 dark:bg-gray-700">
              <div
                className="h-1.5 rounded-full bg-gray-900 transition-all duration-500 dark:bg-gray-200"
                style={{
                  width: `${(category.value / maxValue) * 100}%`,
                }}
                role="presentation"
              />
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}
