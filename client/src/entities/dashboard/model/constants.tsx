import React from "react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import Link from "next/link";
import type { CellRenderer } from "./types";

export const LINE_CHART_COLORS = {
  public: "#3B82F6",
  private: "#F97316",
  axis: {
    light: "#6C727F",
    dark: "#F3F4F6",
    tick: {
      light: "#6C727F",
      dark: "#F3F4F6",
    },
  },
  grid: {
    light: "#E5E7EB",
    dark: "#F3F4F6",
  },
};

export const TABLE_COLUMNS = {
  REPORT_ID: "reportId",
  SEVERITY: "severity",
  ACTION: "action",
} as const;

const SEVERITY_VALUES = {
  CRITICAL: "Critical",
  HIGH: "High",
  MEDIUM: "Medium",
  LOW: "Low",
} as const;

const SEVERITY_CLASSES: Record<string, string> = {
  [SEVERITY_VALUES.CRITICAL]: "!border-[#EF4343] bg-[#EF4343] text-white",
  [SEVERITY_VALUES.HIGH]: "text-gray-750 border-gray-neutral-200",
  [SEVERITY_VALUES.MEDIUM]: "text-gray-750 border-gray-neutral-200",
  [SEVERITY_VALUES.LOW]: "text-gray-750 border-gray-neutral-200",
};

export const CELL_RENDERERS: Record<string, CellRenderer> = {
  [TABLE_COLUMNS.REPORT_ID]: (value) => {
    return (
      <Link href="#" className="text-[#3C83F6] hover:underline">
        {value}
      </Link>
    );
  },
  [TABLE_COLUMNS.SEVERITY]: (value) => {
    return (
      <Badge
        variant="outline"
        className={cn(
          "text-gray-750 border-gray-neutral-200 max-h-6.5 px-3 py-[5px] text-xs font-bold capitalize",
          SEVERITY_CLASSES[value],
        )}
      >
        {value}
      </Badge>
    );
  },
  [TABLE_COLUMNS.ACTION]: (value) => {
    return (
      <Button
        variant="outline"
        className="text-gray-750 border-gray-neutral-200 max-h-6.5 cursor-pointer rounded-full px-3 py-[5px] text-xs font-bold capitalize dark:hover:bg-white"
      >
        {value}
      </Button>
    );
  },
};
