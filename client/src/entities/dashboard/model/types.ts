export type StatItem = {
  iconUrl: string;
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
  color: string;
};

export type RecentReportItem = {
  reportId: string;
  dateSubmitted: string;
  issueType: string;
  whoSubmitted: string;
  aiSystem: string;
  severity: string;
};

export type RecentReportActionItem = {
  label: string;
};

export type CellRenderer = (
  value: string,
  row: RecentReportItem | RecentReportActionItem,
  column: string,
) => React.ReactNode;
