"use client";

import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";

import { cn } from "~/lib/utils";

function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn("flex gap-1.5", className)}
      {...props}
    />
  );
}

function RadioGroupItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item> & {
  children?: React.ReactNode;
}) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        "focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive relative inline-flex cursor-pointer items-center justify-center gap-2 rounded-md text-xs font-medium whitespace-nowrap transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50",
        "bg-background dark:bg-input/30 dark:border-input border border-gray-300 text-gray-700 shadow-xs hover:bg-gray-50 focus-visible:border-gray-300 focus-visible:ring-gray-100 disabled:border-gray-200 disabled:text-gray-300",
        "data-[state=checked]:border-indigo-500 data-[state=checked]:bg-indigo-500 data-[state=checked]:text-white data-[state=checked]:hover:bg-indigo-600 data-[state=checked]:focus-visible:ring-indigo-100",
        "px-2 py-[3px]",
        className,
      )}
      {...props}
    >
      {children}
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="absolute inset-0 flex items-center justify-center"
      />
    </RadioGroupPrimitive.Item>
  );
}

export { RadioGroup, RadioGroupItem };
