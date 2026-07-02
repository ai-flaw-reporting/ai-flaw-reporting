"use client";

import { useId } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { cn } from "~/lib/utils";

interface Action {
  href: string;
  disabled?: boolean;
}

interface Props {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  ctaText?: string;
  action: Action;
  highlighted?: boolean;
}

export default function CardComponent({
  icon,
  title,
  description,
  ctaText,
  action,
  highlighted = false,
}: Props) {
  const titleId = useId();
  const router = useRouter();

  return (
    <article
      role="link"
      tabIndex={0}
      aria-labelledby={titleId}
      onClick={() => {
        if (action.disabled) return;
        router.push(action.href);
      }}
      onKeyDown={(e) => {
        if (action.disabled) return;
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          router.push(action.href);
        }
      }}
      className={cn(
        "flex w-full cursor-pointer flex-col gap-5 rounded-xl border p-8 transition-colors duration-200",
        highlighted
          ? "border-transparent bg-[#1d2939] dark:bg-gray-800"
          : "border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800",
        action.disabled && "pointer-events-none opacity-60",
      )}
    >
      <div
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-lg",
          highlighted ? "bg-white/10" : "bg-gray-100 dark:bg-gray-700",
        )}
      >
        {icon}
      </div>

      <div className="flex-1 space-y-2">
        <h3
          id={titleId}
          className={cn(
            "text-lg font-bold leading-6",
            highlighted ? "text-white" : "text-gray-900 dark:text-white",
          )}
        >
          {title}
        </h3>
        {description && (
          <p
            className={cn(
              "text-sm leading-6",
              highlighted
                ? "text-gray-300"
                : "text-gray-500 dark:text-gray-400",
            )}
          >
            {description}
          </p>
        )}
      </div>

      {ctaText && (
        <p
          className={cn(
            "flex items-center gap-1 text-sm font-semibold",
            highlighted ? "text-white" : "text-gray-900 dark:text-white",
          )}
        >
          {ctaText} <ChevronRight size={14} aria-hidden="true" />
        </p>
      )}
    </article>
  );
}
