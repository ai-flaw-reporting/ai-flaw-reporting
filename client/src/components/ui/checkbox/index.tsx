"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "lucide-react";
import dynamic from "next/dynamic";

import { cn } from "~/lib/utils";

const CheckCircleFillIcon = dynamic(() =>
  import("~/components/icons/check-circle-fill-icon").then(
    (mod) => mod.CheckCircleFillIcon,
  ),
);

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center text-current transition-none"
      >
        <CheckIcon className="size-3.5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

function CheckboxCard({
  className,
  iconClassName,
  children,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root> & {
  children?: React.ReactNode;
  iconClassName?: string;
}) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox-card"
      className={cn(
        "relative w-full cursor-pointer rounded-lg border bg-white px-3.5 py-3 text-left",
        "border-gray-300 data-[state=checked]:border-indigo-700 data-[state=checked]:bg-indigo-50",
        "transition-colors outline-none",
        "focus-visible:ring-ring/50 focus-visible:border-ring focus-visible:ring-[3px]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "flex items-start",
        className,
      )}
      {...props}
    >
      <div className="pr-8 leading-relaxed">{children}</div>

      <CheckboxPrimitive.Indicator
        data-slot="checkbox-card-indicator"
        className="pointer-events-none absolute top-3 right-3.5"
      >
        <CheckCircleFillIcon
          className={cn("size-[26px] text-indigo-800", iconClassName)}
          aria-hidden="true"
        />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox, CheckboxCard };
