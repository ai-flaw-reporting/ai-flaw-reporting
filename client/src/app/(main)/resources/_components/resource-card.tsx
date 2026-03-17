"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, ChevronUp, SquareArrowOutUpRight } from "lucide-react";
import { useTheme } from "next-themes";

import { cn } from "~/lib/utils";
import { ScopeBadge } from "~/components/ui/scope-badge";
import type { Resource } from "~/entities/resource/model/types";

const INVERT_ICONS = [
  "anthropic.svg",
  "open-ai.svg",
  "ai-incident-database.svg",
];

export function ResourceCard({ resource }: { resource: Resource }) {
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useTheme();

  const {
    title,
    organizationTypes,
    scopesType,
    scopes,
    summary,
    reportUrl,
    icon,
    iconDark,
  } = resource;

  const isDarkMode = theme === "dark";
  const displayIcon = isDarkMode && iconDark ? iconDark : icon;
  const shouldInvert =
    displayIcon && INVERT_ICONS.some((name) => displayIcon.includes(name));

  const handleCardClick = () => {
    if (reportUrl) {
      window.open(reportUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <article
      onClick={handleCardClick}
      className={cn(
        "flex h-full flex-col gap-4 overflow-hidden rounded-2xl border-2 border-gray-300 bg-white px-6 py-4 transition-all duration-300 dark:border-gray-500 dark:bg-gray-800",
        reportUrl
          ? "hover:border-primary-400 dark:hover:border-primary-400 cursor-pointer hover:shadow-[0_32px_64px_-12px_rgba(181,111,235,0.14)]"
          : "cursor-default",
      )}
    >
      {/* Row 1: icon + title (left) + report button (right) */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          {displayIcon && (
            <Image
              aria-hidden="true"
              src={displayIcon}
              alt=""
              width={32}
              height={32}
              className={cn(
                "size-8 shrink-0 object-contain",
                shouldInvert && "dark:invert",
              )}
            />
          )}
          <h3 className="min-w-0 text-lg font-bold text-gray-800 dark:text-white">
            {title}
          </h3>
        </div>

        {reportUrl ? (
          <Link
            href={reportUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex shrink-0 cursor-pointer items-center gap-1.5 text-sm font-semibold text-gray-700 transition-colors hover:text-gray-900 dark:text-gray-200 dark:hover:text-white"
          >
            <SquareArrowOutUpRight aria-hidden="true" className="size-4" />
            Report
          </Link>
        ) : (
          <span className="inline-flex shrink-0 cursor-not-allowed items-center gap-1.5 text-sm font-semibold text-gray-400">
            <SquareArrowOutUpRight aria-hidden="true" className="size-4" />
            Report
          </span>
        )}
      </div>

      {/* Row 2: org types */}
      <div className="flex items-center gap-2">
        {organizationTypes.map((orgType) => (
          <span
            key={orgType}
            className="text-sm text-gray-500 dark:text-gray-400"
          >
            {orgType}
          </span>
        ))}
      </div>

      {/* Description */}
      <div className="flex flex-1 flex-col gap-1">
        <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">
          You should report here if...
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300">{summary}</p>
      </div>

      {/* Read More toggle — always at bottom */}
      <div className="mt-auto">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen((prev) => !prev);
          }}
          className="flex cursor-pointer items-center gap-1 text-sm font-semibold text-indigo-600 transition-colors hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
        >
          Read More
          {isOpen ? (
            <ChevronUp className="size-4" />
          ) : (
            <ChevronDown className="size-4" />
          )}
        </button>
      </div>

      {/* Expandable scope section */}
      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-in-out",
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <div className="flex flex-col gap-2 pb-2">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
              {scopesType}:
            </span>
            <div className="flex flex-wrap gap-2">
              {scopes.map((scope) => (
                <ScopeBadge key={scope} scope={scope} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
