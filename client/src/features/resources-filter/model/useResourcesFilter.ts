"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import {
  buildSearchParams,
  DEFAULT_FILTERS,
  URL_PARAMS,
} from "~/entities/resource";

export function useResourceFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const formScope =
    searchParams.get(URL_PARAMS.FORM_SCOPE) || DEFAULT_FILTERS.formScope;
  const organizationType =
    searchParams.get(URL_PARAMS.ORGANIZATION_TYPE) ||
    DEFAULT_FILTERS.organizationType;

  // Initialize URL params with defaults if missing
  useEffect(() => {
    const hasFormScope = searchParams.has(URL_PARAMS.FORM_SCOPE);
    const hasOrgType = searchParams.has(URL_PARAMS.ORGANIZATION_TYPE);

    if (!hasFormScope || !hasOrgType) {
      const params = buildSearchParams({
        formScope:
          searchParams.get(URL_PARAMS.FORM_SCOPE) || DEFAULT_FILTERS.formScope,
        organizationType:
          searchParams.get(URL_PARAMS.ORGANIZATION_TYPE) ||
          DEFAULT_FILTERS.organizationType,
      });
      router.replace(`?${params}`, { scroll: false });
    }
  }, [searchParams, router]);

  const handleFormScopeChange = (value: string) => {
    const params = buildSearchParams({
      formScope: value,
      organizationType:
        searchParams.get(URL_PARAMS.ORGANIZATION_TYPE) ||
        DEFAULT_FILTERS.organizationType,
    });
    router.push(`?${params}`, { scroll: false });
  };

  const handleOrgTypeChange = (value: string) => {
    const params = buildSearchParams({
      formScope:
        searchParams.get(URL_PARAMS.FORM_SCOPE) || DEFAULT_FILTERS.formScope,
      organizationType: value,
    });
    router.push(`?${params}`, { scroll: false });
  };

  return {
    formScope,
    organizationType,
    handleFormScopeChange,
    handleOrgTypeChange,
  };
}
