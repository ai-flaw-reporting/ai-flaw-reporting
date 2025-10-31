"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { buildSearchParams } from "~/entities/resource/lib/utils";
import { URL_PARAMS } from "~/entities/resource/model/constants";

export function useResourceFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const formScope = searchParams.get(URL_PARAMS.FORM_SCOPE);
  const organizationType = searchParams.get(URL_PARAMS.ORGANIZATION_TYPE);

  const handleFormScopeChange = (value: string) => {
    // If clicking the same value, clear the filter
    const newValue = value === formScope ? null : value;
    const params = buildSearchParams({
      formScope: newValue,
      organizationType: searchParams.get(URL_PARAMS.ORGANIZATION_TYPE),
    });
    router.push(`?${params}`, { scroll: false });
  };

  const handleOrgTypeChange = (value: string) => {
    // If clicking the same value, clear the filter
    const newValue = value === organizationType ? null : value;
    const params = buildSearchParams({
      formScope: searchParams.get(URL_PARAMS.FORM_SCOPE),
      organizationType: newValue,
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
