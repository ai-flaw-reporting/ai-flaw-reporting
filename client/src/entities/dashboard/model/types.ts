export type StatItem = {
  iconUrl: string;
  iconBg?: string;
  label: string;
  value: string;
  trend: string;
};

export type ReportOvertime = {
  month: string;
  public: number;
  private: number;
};

export type IssueCategory = {
  label: string;
  value: number;
};

export type RecentReportItem = {
  reportId: string;
  title: string;
  system: string;
  category: string;
  severity: string;
  status: string;
  reported: string;
};

export type RecentReportActionItem = {
  label: string;
};

export type CellRenderer = (
  value: string,
  row: RecentReportItem | RecentReportActionItem,
  column: string,
) => React.ReactNode;
