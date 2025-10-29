import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { TABLE_COLUMNS } from "~/entities/dashboard/model/constants";
import { useRecentReports } from "~/entities/dashboard/model/hooks/use-recent-reports";

import { renderCell } from "~/entities/dashboard/lib/render-cell";
import { humanizeKey } from "~/lib/utils";

export default function ReportsTable() {
  const { recentReports, columns, total, pageSize } = useRecentReports();

  return (
    <div className="border-gray-neutral-200 mx-auto max-w-[1280px] overflow-hidden rounded-md border">
      <Table>
        <TableHeader>
          <TableRow className="border-gray-neutral-200">
            {columns.map((column) => (
              <TableHead
                className="text-gray-neutral-450 px-6 py-4 text-sm font-normal dark:text-gray-100"
                key={column}
              >
                {humanizeKey(column)}
              </TableHead>
            ))}

            <TableHead className="text-gray-neutral-450 px-6 py-4 text-sm font-normal dark:text-gray-100">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recentReports.map((row) => (
            <TableRow
              key={row.reportId}
              className="border-gray-neutral-200 text-left"
            >
              {columns.map((column) => (
                <TableCell
                  key={column}
                  className="text-gray-neutral-450 px-6 py-5 text-sm font-normal dark:text-gray-100"
                >
                  {renderCell(column, row)}
                </TableCell>
              ))}

              <TableCell className="text-gray-neutral-450 px-6 py-5 text-sm font-normal dark:text-gray-100">
                {renderCell(TABLE_COLUMNS.ACTION, {
                  label: "Download Report",
                })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell
              colSpan={columns.length + 1} // +1 for the action column
              className="text-gray-neutral-450 bg-[#F1F5F933] py-4 text-center text-sm font-normal dark:bg-gray-900 dark:text-gray-100"
            >
              Showing {pageSize} most recent reports of {total} total
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
