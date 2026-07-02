import { PLATFORM_TO_STAKEHOLDER_MAP } from "../model/form-data/review-and-submit-fields-config";

export function getStakeholdersFromPlatforms(
  platforms: string[] = [],
): string[] {
  return platforms
    .map((platform) => PLATFORM_TO_STAKEHOLDER_MAP[platform])
    .filter((stakeholder): stakeholder is string => Boolean(stakeholder));
}

export function mergeStakeholdersWithPlatforms(
  platforms: string[] = [],
  currentStakeholders: string[] = [],
): string[] {
  const stakeholdersToSelect = getStakeholdersFromPlatforms(platforms);

  return Array.from(new Set([...currentStakeholders, ...stakeholdersToSelect]));
}
