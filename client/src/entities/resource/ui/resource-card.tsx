"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import { SquareArrowOutUpRight } from "lucide-react";
import { useId } from "react";
import { useTheme } from "next-themes";
import { cn } from "~/lib/utils";
import type { Resource } from "../model/types";
import { getBadgeVariant } from "../lib/utils";

const INVERT_ICONS = [
  "anthropic.svg",
  "open-ai.svg",
  "ai-incident-database.svg",
];

export function ResourceCard({ resource }: { resource: Resource }) {
  const descId = useId();
  const { theme } = useTheme();
  const customCursor = "cursor-[url('/icons/cursor.svg')_10_10,_pointer]";
  const {
    title,
    organizationTypes,
    scopes,
    summary,
    reportUrl,
    readMoreUrl,
    icon,
    iconDark,
  } = resource;

  const isDarkMode = theme === "dark";
  const displayIcon = isDarkMode && iconDark ? iconDark : icon;
  const shouldInvert =
    displayIcon && INVERT_ICONS.some((name) => displayIcon.includes(name));

  return (
    <Card className={cn("h-full py-8 dark:border-gray-500", customCursor)}>
      <article
        aria-labelledby={`title-${descId}`}
        aria-describedby={descId}
        className="flex h-full flex-col space-y-4"
      >
        <CardHeader className="gap-0 px-16 pt-5">
          <CardTitle className="flex justify-between">
            <div className="flex flex-col space-y-4">
              <h3
                id={`title-${descId}`}
                className="flex items-center gap-4 text-xl font-bold"
              >
                {displayIcon && (
                  <Image
                    aria-hidden="true"
                    src={displayIcon}
                    alt=""
                    width={32}
                    height={32}
                    className={cn(shouldInvert && "dark:invert")}
                  />
                )}
                {title}
              </h3>
            </div>

            {reportUrl ? (
              <Button
                asChild
                className={cn("bg-indigo-500 font-semibold", customCursor)}
              >
                <Link href={reportUrl}>
                  <SquareArrowOutUpRight
                    aria-hidden="true"
                    width={20}
                    height={20}
                  />
                  Report
                </Link>
              </Button>
            ) : (
              <Button
                disabled
                className="bg-indigo-500 font-semibold"
                aria-label="Report option not available"
              >
                <SquareArrowOutUpRight
                  aria-hidden="true"
                  width={20}
                  height={20}
                />
                Report
              </Button>
            )}
          </CardTitle>
        </CardHeader>

        <CardContent className="mb-2 flex-1 space-y-4 px-16">
          <ul
            className="flex flex-wrap gap-4"
            aria-label="Organization type and report scopes"
          >
            {organizationTypes?.map((orgType: string) => (
              <li key={orgType}>
                <Badge variant="default">{orgType}</Badge>
              </li>
            ))}
            {scopes?.map((scope) => (
              <li key={scope}>
                <Badge variant={getBadgeVariant(scope)}>{scope}</Badge>
              </li>
            ))}
          </ul>
          <p className="mb-2 text-sm font-semibold text-gray-600 dark:text-gray-200">
            You should report here if...
          </p>
          <p
            id={descId}
            className="text-sm font-normal text-gray-600 dark:text-gray-200"
          >
            {summary}
          </p>
        </CardContent>

        <CardFooter className="px-16 pb-5">
          {readMoreUrl ? (
            <Link
              className={`text-sm font-semibold text-indigo-600 underline hover:text-indigo-800 ${customCursor}`}
              href={readMoreUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Read more
            </Link>
          ) : (
            <span
              aria-label="Read more option not available"
              className="cursor-default text-sm font-semibold text-gray-400"
            >
              Read more
            </span>
          )}
        </CardFooter>
      </article>
    </Card>
  );
}
