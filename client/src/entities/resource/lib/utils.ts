import { SCOPE_TYPES } from "../model/constants";

import { BADGE_VARIANTS } from "../model/constants";
import type { FilterParams, Resource } from "../model/types";

export const getBadgeVariant = (scope: string) => {
  switch (scope) {
    case SCOPE_TYPES.SECURITY_VULNERABILITY:
      return BADGE_VARIANTS.ERROR;
    case SCOPE_TYPES.INCIDENT:
      return BADGE_VARIANTS.WARNING;
    case SCOPE_TYPES.AI_SAFETY_HAZARD:
      return BADGE_VARIANTS.ERROR;
    default:
      return BADGE_VARIANTS.DEFAULT;
  }
};

export function sortResourcesByName(resources: Resource[]): Resource[] {
  return [...resources].sort((a, b) => a.title.localeCompare(b.title));
}

export function filterResources(
  resources: Resource[],
  filters: FilterParams,
): Resource[] {
  return resources.filter((resource) => {
    const matchesFormScope =
      !filters.formScope || resource.scopes.includes(filters.formScope);

    const matchesOrgType =
      !filters.organizationType ||
      resource.organizationType === filters.organizationType;

    return matchesFormScope && matchesOrgType;
  });
}

export function filterAndSortResources(
  resources: Resource[],
  filters: FilterParams,
): Resource[] {
  return resources.filter((resource) => {
    const matchesFormScope =
      !filters.formScope || resource.scopes.includes(filters.formScope);

    const matchesOrgType =
      !filters.organizationType ||
      resource.organizationType === filters.organizationType;

    return matchesFormScope && matchesOrgType;
  });
}

export function parseResourceFilters(
  searchParams: Record<string, string | string[] | undefined>,
): FilterParams {
  const formScope =
    typeof searchParams.formScope === "string" ? searchParams.formScope : null;

  const organizationType =
    typeof searchParams.organizationType === "string"
      ? searchParams.organizationType
      : null;

  return {
    formScope,
    organizationType,
  };
}

export function buildSearchParams(filters: FilterParams): string {
  const params = new URLSearchParams();

  if (filters.formScope) {
    params.set("formScope", filters.formScope);
  }

  if (filters.organizationType) {
    params.set("organizationType", filters.organizationType);
  }

  return params.toString();
}
