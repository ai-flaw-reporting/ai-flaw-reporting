import type { RecentReportActionItem, RecentReportItem } from "../model/types";
import { CELL_RENDERERS } from "../model/constants";

export const renderCell = (
  column: string,
  row: RecentReportItem | RecentReportActionItem,
) => {
  const value =
    "label" in row ? row.label : row[column as keyof RecentReportItem];

  return CELL_RENDERERS[column]?.(value, row, column) ?? String(value ?? "");
};
