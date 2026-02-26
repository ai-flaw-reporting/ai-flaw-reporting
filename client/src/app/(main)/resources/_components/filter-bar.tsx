"use client";

import { useState } from "react";
import Image from "next/image";

import { cn } from "~/lib/utils";
import { useResourceFilters } from "~/features/resources-filter/model/useResourcesFilter";
import {
  FORM_SCOPE_OPTIONS,
  ORGANIZATION_TYPE_OPTIONS,
} from "~/entities/resource/model/constants";

function FilterButton({
  label,
  isActive,
  onClick,
  className,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "text-md inline-flex h-[24px] cursor-pointer items-center justify-center rounded-[6px] border px-2 py-[3px] leading-[21px] font-medium shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] transition-colors",
        isActive
          ? "border-indigo-500 bg-indigo-500 text-white"
          : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600",
        className,
      )}
    >
      {label}
    </button>
  );
}

export function ResourcesFilterBar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const {
    formScope,
    organizationType,
    handleFormScopeChange,
    handleOrgTypeChange,
  } = useResourceFilters();

  const hasActiveFilters = formScope ?? organizationType;

  return (
    <nav aria-label="Filter resources" className="w-full">
      {/* Mobile + Tablet: Filters toggle button */}
      <div className="lg:hidden">
        <button
          type="button"
          onClick={() => setIsMobileOpen((prev) => !prev)}
          className={cn(
            "flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] transition-colors hover:bg-gray-50 dark:border-gray-500 dark:bg-gray-800 dark:hover:bg-gray-700",
            hasActiveFilters && "border-indigo-500",
          )}
        >
          <Image
            src="/icons/filter-lines.svg"
            alt=""
            aria-hidden="true"
            width={20}
            height={20}
            className="dark:invert"
          />
          <span className="text-sm font-bold text-gray-700 dark:text-gray-200">
            Filters
          </span>
        </button>

        {/* Mobile filters with smooth animation */}
        <div
          className={cn(
            "grid transition-[grid-template-rows] duration-300 ease-in-out",
            isMobileOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
          )}
        >
          <div className="overflow-hidden">
            <div className="flex flex-col gap-4 pt-3">
              <div className="flex flex-col gap-2">
                <h3 className="pl-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                  Form Scope:
                </h3>
                <div className="flex flex-col gap-2">
                  {FORM_SCOPE_OPTIONS.map((label) => (
                    <FilterButton
                      key={label}
                      label={label}
                      isActive={formScope === label}
                      onClick={() => handleFormScopeChange(label)}
                      className="h-10 w-full rounded-lg px-3 text-sm"
                    />
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="pl-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                  Organization Type:
                </h3>
                <div className="flex flex-col gap-2">
                  {ORGANIZATION_TYPE_OPTIONS.map((label) => (
                    <FilterButton
                      key={label}
                      label={label}
                      isActive={organizationType === label}
                      onClick={() => handleOrgTypeChange(label)}
                      className="h-10 w-full rounded-lg px-3 text-sm"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop: Inline filter groups */}
      <div className="hidden items-center gap-1.5 lg:flex lg:flex-wrap">
        <div className="flex items-center gap-1.5">
          <h3 className="text-md pl-2 leading-[21px] font-medium text-gray-600 dark:text-gray-400">
            Form Scope:
          </h3>
          {FORM_SCOPE_OPTIONS.map((label) => (
            <FilterButton
              key={label}
              label={label}
              isActive={formScope === label}
              onClick={() => handleFormScopeChange(label)}
            />
          ))}
        </div>

        <div className="flex items-center gap-1.5">
          <h3 className="text-md pl-2 leading-[21px] font-medium text-gray-600 dark:text-gray-400">
            Organization Type:
          </h3>
          {ORGANIZATION_TYPE_OPTIONS.map((label) => (
            <FilterButton
              key={label}
              label={label}
              isActive={organizationType === label}
              onClick={() => handleOrgTypeChange(label)}
            />
          ))}
        </div>
      </div>
    </nav>
  );
}
