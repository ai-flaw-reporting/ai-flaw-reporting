import React from "react";
import { cn } from "~/lib/utils";
import type { CellRenderer } from "./types";

export const LINE_CHART_COLORS = {
  public: "#374151",
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
    dark: "#374151",
  },
};

export const TABLE_COLUMNS = {
  REPORT_ID: "reportId",
  SEVERITY: "severity",
  STATUS: "status",
} as const;

const SEVERITY_STYLES: Record<
  string,
  { bg: string; text: string; border: string }
> = {
  Critical: {
    bg: "bg-red-50",
    text: "text-red-600",
    border: "border-red-200",
  },
  High: {
    bg: "bg-orange-50",
    text: "text-orange-700",
    border: "border-orange-200",
  },
  Medium: {
    bg: "bg-gray-100",
    text: "text-gray-600",
    border: "border-gray-200",
  },
  Low: {
    bg: "bg-gray-50",
    text: "text-gray-500",
    border: "border-gray-200",
  },
};

const STATUS_STYLES: Record<
  string,
  { dot: string; text: string; bg: string }
> = {
  Triaged: {
    dot: "bg-green-500",
    text: "text-green-700",
    bg: "bg-green-50",
  },
  Resolved: {
    dot: "bg-green-500",
    text: "text-green-700",
    bg: "bg-green-50",
  },
  Routed: {
    dot: "bg-gray-900",
    text: "text-gray-700",
    bg: "transparent",
  },
  Submitted: {
    dot: "bg-gray-400",
    text: "text-gray-500",
    bg: "transparent",
  },
};

export const CELL_RENDERERS: Record<string, CellRenderer> = {
  [TABLE_COLUMNS.REPORT_ID]: (value) => (
    <span className="font-mono text-xs text-gray-500">{value}</span>
  ),

  [TABLE_COLUMNS.SEVERITY]: (value) => {
    const style = SEVERITY_STYLES[value] ?? {
      bg: "bg-gray-100",
      text: "text-gray-600",
      border: "border-gray-200",
    };
    return (
      <span
        className={cn(
          "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
          style.bg,
          style.text,
          style.border,
        )}
      >
        {value}
      </span>
    );
  },

  [TABLE_COLUMNS.STATUS]: (value) => {
    const style = STATUS_STYLES[value] ?? {
      dot: "bg-gray-400",
      text: "text-gray-500",
      bg: "transparent",
    };
    const hasBg = style.bg !== "transparent";
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium",
          style.text,
          hasBg && style.bg,
        )}
      >
        <span
          className={cn("h-1.5 w-1.5 rounded-full", style.dot)}
          aria-hidden="true"
        />
        {value}
      </span>
    );
  },
};
