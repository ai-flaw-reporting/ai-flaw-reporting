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
    case SCOPE_TYPES.AI_SAFETY:
      return BADGE_VARIANTS.ERROR;
    default:
      return BADGE_VARIANTS.DEFAULT;
  }
};

function matchesOrganizationType(
  resourceOrgTypes: string[],
  filterOrgType: string | null,
): boolean {
  if (!filterOrgType) {
    return true;
  }
  return resourceOrgTypes.includes(filterOrgType);
}

export function sortResourcesByName(resources: Resource[]): Resource[] {
  return [...resources].sort((a, b) => a.title.localeCompare(b.title));
}

export function filterResources(
  resources: Resource[],
  filters: FilterParams,
): Resource[] {
  return resources.filter((resource) => {
    // Map "AI Safety Hazard" filter to "AI Safety" scope in data
    if (!filters.formScope) {
      const matchesOrgType = matchesOrganizationType(
        resource.organizationTypes,
        filters.organizationType,
      );
      return matchesOrgType;
    }

    const formScope: string = filters.formScope;
    const scopeToMatch =
      formScope === SCOPE_TYPES.AI_SAFETY_HAZARD
        ? SCOPE_TYPES.AI_SAFETY
        : formScope;

    const matchesFormScope = resource.scopes.includes(scopeToMatch);

    const matchesOrgType = matchesOrganizationType(
      resource.organizationTypes,
      filters.organizationType,
    );

    return matchesFormScope && matchesOrgType;
  });
}

export function filterAndSortResources(
  resources: Resource[],
  filters: FilterParams,
): Resource[] {
  return resources.filter((resource) => {
    // Map "AI Safety Hazard" filter to "AI Safety" scope in data
    if (!filters.formScope) {
      const matchesOrgType = matchesOrganizationType(
        resource.organizationTypes,
        filters.organizationType,
      );
      return matchesOrgType;
    }

    const formScope: string = filters.formScope;
    const scopeToMatch =
      formScope === SCOPE_TYPES.AI_SAFETY_HAZARD
        ? SCOPE_TYPES.AI_SAFETY
        : formScope;

    const matchesFormScope = resource.scopes.includes(scopeToMatch);

    const matchesOrgType = matchesOrganizationType(
      resource.organizationTypes,
      filters.organizationType,
    );

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
