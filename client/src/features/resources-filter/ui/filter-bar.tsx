"use client";

import { Button } from "~/components/ui/button";

import { useResourceFilters } from "../model/useResourcesFilter";
import { cn } from "~/lib/utils";
import {
  FORM_SCOPE_OPTIONS,
  ORGANIZATION_TYPE_OPTIONS,
} from "~/entities/resource/model/constants";

export function ResourcesFilterBar() {
  const {
    formScope,
    organizationType,
    handleFormScopeChange,
    handleOrgTypeChange,
  } = useResourceFilters();

  const commonClassname =
    "h-[24px] rounded-[6px] border px-[8px] py-[3px] text-xs";
  const unActiveClassname =
    "dark:border-gray-400 dark:bg-transparent dark:text-gray-200";

  return (
    <nav className="flex items-center gap-1.5" aria-label="Filter resources">
      <h2 className="sr-only">Filter</h2>

      <div className="flex items-center gap-1.5">
        <h3 className="px-2 text-xs font-medium text-gray-600 dark:text-gray-400">
          Form Scope:
        </h3>
        <div className="flex gap-1.5">
          {FORM_SCOPE_OPTIONS.map((label) => (
            <Button
              key={label}
              className={cn(
                commonClassname,
                formScope !== label && unActiveClassname,
              )}
              variant={formScope === label ? "indigo-default" : "outline"}
              onClick={() => handleFormScopeChange(label)}
            >
              {label}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        <h3 className="px-2 text-xs font-medium text-gray-600 dark:text-gray-400">
          Organization Type:
        </h3>
        <div className="flex gap-1.5">
          {ORGANIZATION_TYPE_OPTIONS.map((label) => (
            <Button
              key={label}
              className={cn(
                commonClassname,
                organizationType !== label && unActiveClassname,
              )}
              variant={
                organizationType === label ? "indigo-default" : "outline"
              }
              onClick={() => handleOrgTypeChange(label)}
            >
              {label}
            </Button>
          ))}
        </div>
      </div>
    </nav>
  );
}
