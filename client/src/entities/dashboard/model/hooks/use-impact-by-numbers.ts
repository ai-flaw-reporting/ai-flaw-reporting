import data from "~/entities/dashboard/model/impact.json";
import type { StatItem } from "../types";

export const useImpactByNumbers = () => {
  const impactByNumbers: StatItem[] = data;

  return { impactByNumbers };
};
