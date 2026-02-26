import { cn } from "~/lib/utils";
import { SCOPE_TYPES } from "~/entities/resource/model/constants";

const SCOPE_STYLE_MAP: Record<string, string> = {
  [SCOPE_TYPES.SECURITY_VULNERABILITY]:
    "border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-300",
  [SCOPE_TYPES.INCIDENT]:
    "border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-800 dark:bg-orange-950 dark:text-orange-300",
  [SCOPE_TYPES.AI_SAFETY]:
    "border-purple-200 bg-purple-50 text-purple-700 dark:border-purple-800 dark:bg-purple-950 dark:text-purple-300",
  [SCOPE_TYPES.AI_SAFETY_HAZARD]:
    "border-purple-200 bg-purple-50 text-purple-700 dark:border-purple-800 dark:bg-purple-950 dark:text-purple-300",
};

const DEFAULT_STYLE =
  "border-gray-200 bg-gray-50 text-gray-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300";

interface ScopeBadgeProps {
  scope: string;
  className?: string;
}

export function ScopeBadge({ scope, className }: ScopeBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        SCOPE_STYLE_MAP[scope] ?? DEFAULT_STYLE,
        className,
      )}
    >
      {scope}
    </span>
  );
}
