"use client";

import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";

import {
  FORM_SCOPE_OPTIONS,
  ORGANIZATION_TYPE_OPTIONS,
} from "~/entities/resource";

import { useResourceFilters } from "../model/useResourcesFilter";

export function ResourcesFilterBar() {
  const {
    formScope,
    organizationType,
    handleFormScopeChange,
    handleOrgTypeChange,
  } = useResourceFilters();

  return (
    <nav className="flex items-center gap-1.5" aria-label="Filter resources">
      <h2 className="sr-only">Filter</h2>

      <div className="flex items-center gap-1.5">
        <h3 className="px-2 text-xs font-medium text-gray-600">Form Scope:</h3>
        <RadioGroup value={formScope} onValueChange={handleFormScopeChange}>
          {FORM_SCOPE_OPTIONS.map((label) => (
            <RadioGroupItem key={label} value={label}>
              {label}
            </RadioGroupItem>
          ))}
        </RadioGroup>
      </div>

      <div className="flex items-center gap-1.5">
        <h3 className="px-2 text-xs font-medium text-gray-600">
          Organization Type:
        </h3>
        <RadioGroup
          value={organizationType}
          onValueChange={handleOrgTypeChange}
        >
          {ORGANIZATION_TYPE_OPTIONS.map((label) => (
            <RadioGroupItem key={label} value={label}>
              {label}
            </RadioGroupItem>
          ))}
        </RadioGroup>
      </div>
    </nav>
  );
}
