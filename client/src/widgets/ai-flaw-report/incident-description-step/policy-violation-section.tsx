"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import Image from "next/image";
import { Link as LucideLink, X } from "lucide-react";
import { useWatch } from "react-hook-form";

import { Item, ItemContent, ItemTitle } from "~/components/ui/item";
import { FieldTooltip } from "~/components/field-tooltip";
import { Badge } from "~/components/ui/badge";
import { Input } from "~/components/ui/input";

import { PolicyViolationReason } from "./policy-violation-reason";
import { useAiFlawFormContext } from "~/entities/ai-flaw-report/model/hooks/useAiFlawFormContext";
import { POLICY_VIOLATION_FIELDS } from "~/entities/ai-flaw-report/model/form-data/incident-description-fields-config";
import { getPolicyLinks } from "~/entities/ai-flaw-report/lib/policy-links";
import { getSafeArray } from "~/lib/form-field-utils";
import { isDomainOrHttpsUrl, normalizeUrl } from "~/lib/url";
import { truncateText } from "~/lib/utils";

function PolicySuggestions() {
  const { control, getValues, setValue } = useAiFlawFormContext();

  const currentUrls: string[] =
    useWatch({ control, name: "incidentDescription.policyViolation.urls" }) ??
    [];

  const systemEntries = getValues("reporterDetails.systems") ?? [];
  const selectedPlatforms = systemEntries.map((s) => s.platform);
  const policyLinks = getPolicyLinks(getSafeArray<string>(selectedPlatforms));

  const addUrl = useCallback(
    (url: string) => {
      const existing =
        getValues("incidentDescription.policyViolation.urls") ?? [];
      const isDuplicate = existing.some(
        (u: string) => normalizeUrl(u) === normalizeUrl(url),
      );
      if (!isDuplicate) {
        setValue("incidentDescription.policyViolation.urls", [
          ...existing,
          url,
        ]);
      }
    },
    [getValues, setValue],
  );

  const visibleSuggestions = policyLinks.filter(
    (link) =>
      !currentUrls.some((u) => normalizeUrl(u) === normalizeUrl(link.url)),
  );

  if (!visibleSuggestions.length) return null;

  return (
    <div>
      <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
        Suggested policies
      </p>
      <ul className="flex flex-wrap gap-2">
        {visibleSuggestions.map((link, index) => (
          <li key={index}>
            <button
              type="button"
              onClick={() => addUrl(link.url)}
              className="cursor-pointer rounded-sm bg-gray-800 px-2 py-[5px] text-xs leading-4.5 font-medium text-white hover:bg-gray-700"
            >
              {link.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PolicyUrlInput() {
  const { getValues, setValue } = useAiFlawFormContext();

  const [inputValue, setInputValue] = useState("");
  const [inputError, setInputError] = useState("");
  const inputValueRef = useRef(inputValue);

  useEffect(() => {
    inputValueRef.current = inputValue;
  }, [inputValue]);

  // Flush pending URL into form state when the component unmounts
  // (e.g. user clicks "Next Step" and the step changes).
  useEffect(() => {
    return () => {
      const pending = inputValueRef.current.trim();
      if (pending && isDomainOrHttpsUrl(pending)) {
        const existing =
          getValues("incidentDescription.policyViolation.urls") ?? [];
        const normalized = normalizeUrl(pending);
        if (!existing.some((u: string) => normalizeUrl(u) === normalized)) {
          setValue("incidentDescription.policyViolation.urls", [
            ...existing,
            pending,
          ]);
        }
      }
    };
  }, []);

  const addUrl = useCallback(
    (url: string) => {
      const trimmed = url.trim();
      if (!trimmed) return;

      if (!isDomainOrHttpsUrl(trimmed)) {
        setInputError(
          "Please enter a valid URL, e.g. https://example.com, example.com, or example.com/policy",
        );
        return;
      }

      const normalized = normalizeUrl(trimmed);
      const existing =
        getValues("incidentDescription.policyViolation.urls") ?? [];
      const isDuplicate = existing.some(
        (u: string) => normalizeUrl(u) === normalized,
      );

      if (isDuplicate) {
        setInputValue("");
        setInputError("");
        return;
      }

      setValue("incidentDescription.policyViolation.urls", [
        ...existing,
        trimmed,
      ]);
      setInputValue("");
      setInputError("");
    },
    [getValues, setValue],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        addUrl(inputValue);
      }
    },
    [addUrl, inputValue],
  );

  return (
    <div className="form-item-field">
      <label className="form-label">
        {POLICY_VIOLATION_FIELDS.urls.label}
      </label>
      <div className="relative">
        <LucideLink
          className="absolute top-1/2 left-3 z-10 h-5 w-5 -translate-y-1/2 text-gray-500"
          aria-hidden="true"
        />
        <Input
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            if (inputError) setInputError("");
          }}
          onKeyDown={handleKeyDown}
          placeholder={POLICY_VIOLATION_FIELDS.urls.placeholder}
          className="pl-10 !text-base placeholder:!text-base placeholder:!leading-6 dark:border-gray-500 dark:placeholder:text-gray-500"
        />
        <FieldTooltip
          text="Enter or paste a direct URL to the relevant policy or guideline and press Enter to add"
          ariaLabel="Policy URL help"
        />
      </div>
      {inputError && (
        <p className="text-destructive mt-1 text-sm">{inputError}</p>
      )}
    </div>
  );
}

function PolicyUrlList() {
  const { control, getValues, setValue } = useAiFlawFormContext();

  const currentUrls: string[] =
    useWatch({ control, name: "incidentDescription.policyViolation.urls" }) ??
    [];

  const removeUrl = useCallback(
    (url: string) => {
      const existing =
        getValues("incidentDescription.policyViolation.urls") ?? [];
      setValue(
        "incidentDescription.policyViolation.urls",
        existing.filter((u: string) => u !== url),
      );
    },
    [getValues, setValue],
  );

  if (currentUrls.length === 0) return null;

  return (
    <ul className="flex flex-wrap gap-2">
      {currentUrls.map((url, index) => (
        <li key={index}>
          <Badge
            variant="default"
            className="text-gray-25 group gap-1 rounded-sm px-2 py-[3px] text-xs font-medium"
            title={url}
          >
            {truncateText(url, 50)}
            <button
              type="button"
              onClick={() => removeUrl(url)}
              className="text-gray-25 group-hover:text-gray-25 cursor-pointer appearance-none transition-colors"
              aria-label={`Remove ${url}`}
            >
              <X size={12} aria-hidden="true" />
            </button>
          </Badge>
        </li>
      ))}
    </ul>
  );
}

export function PolicyViolationSection() {
  return (
    <Item variant="outline" className="form-item-card">
      <ItemContent className="space-y-6">
        <div>
          <ItemTitle className="form-title flex items-baseline gap-4">
            {POLICY_VIOLATION_FIELDS.icon && (
              <Image
                src={POLICY_VIOLATION_FIELDS.icon}
                alt=""
                aria-hidden="true"
                width={24}
                height={24}
              />
            )}
            {POLICY_VIOLATION_FIELDS.title}
          </ItemTitle>
          {POLICY_VIOLATION_FIELDS.description && (
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-50">
              {POLICY_VIOLATION_FIELDS.description}
            </p>
          )}
        </div>

        <PolicySuggestions />

        <PolicyUrlInput />

        <PolicyUrlList />

        <PolicyViolationReason />
      </ItemContent>
    </Item>
  );
}
