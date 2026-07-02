"use client";

import React from "react";
import { Filter } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Button } from "~/components/ui/button";
import { useRecentReports } from "~/entities/dashboard/model/hooks/use-recent-reports";
import { renderCell } from "~/entities/dashboard/lib/render-cell";

const COLUMN_LABELS: Record<string, string> = {
  reportId: "ID",
  title: "Title",
  system: "System",
  category: "Category",
  severity: "Severity",
  status: "Status",
  reported: "Reported",
};

export default function ReportsTable() {
  const { recentReports, columns, total } = useRecentReports();

  return (
    <div className="mx-auto max-w-[1280px] overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
      {/* Table header */}
      <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5 dark:border-gray-700">
        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            Recent reports
          </h2>
          <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
            {total} public reports &middot; refreshed every hour
          </p>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="border-gray-200 dark:border-gray-700">
            {columns.map((column) => (
              <TableHead
                key={column}
                className="text-gray-neutral-450 px-6 py-4 text-xs font-semibold tracking-wider uppercase dark:text-gray-400"
              >
                {COLUMN_LABELS[column] ?? column}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {recentReports.map((row) => (
            <TableRow
              key={row.reportId}
              className="border-gray-200 text-left dark:border-gray-700"
            >
              {columns.map((column) => (
                <TableCell
                  key={column}
                  className="text-gray-neutral-450 px-6 py-5 text-sm dark:text-gray-300"
                >
                  {renderCell(column, row)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
