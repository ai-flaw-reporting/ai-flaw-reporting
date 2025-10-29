import data from "~/entities/dashboard/model/issue-categories.json";
import type { IssueCategory } from "../types";

export const useIssueCategories = () => {
  const issueCategories = data as IssueCategory[];

  return { issueCategories };
};
