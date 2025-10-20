"use client";

import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import Image from "next/image";

import { cn } from "~/lib/utils";

function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn("flex gap-1.5", className)}
      role="radiogroup"
      {...props}
    />
  );
}

function RadioGroupItem({
  className,
  children,
  variant = "default",
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item> & {
  children?: React.ReactNode;
  variant?: "default" | "yesno";
}) {
  if (variant === "yesno") {
    const isYes = props.value === "true";
    const isNo = props.value === "false";

    return (
      <RadioGroupPrimitive.Item
        data-slot="radio-group-item"
        className={cn(
          "focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 aria-invalid:border-destructive relative inline-flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50",
          "text-gray-blue-700 border border-gray-300 bg-gray-100 shadow-xs hover:bg-gray-50 focus-visible:border-gray-300 focus-visible:ring-gray-100 disabled:border-gray-200 disabled:text-gray-300 dark:border-gray-400 dark:data-[state=checked]:border-indigo-500 dark:data-[state=checked]:hover:border-indigo-600",
          "data-[state=checked]:focus-visible:ring-primary-100 data-[state=checked]:text-gray-cool-100 data-[state=checked]:border-indigo-500 data-[state=checked]:bg-indigo-500 data-[state=checked]:hover:bg-indigo-600",
          "h-16 w-20 px-3 py-4",
          className,
        )}
        {...props}
      >
        <div className="flex flex-col items-center gap-1">
          {isYes && (
            <div className="relative flex h-6 w-8 items-center justify-center">
              {/* Checked state - always visible when checked */}
              <Image
                src="/icons/form/check-checked.svg"
                alt=""
                width={31}
                height={24}
                className={cn(
                  "text-current",
                  props.checked ? "block" : "hidden",
                )}
                aria-hidden="true"
              />
              {/* Unchecked state - light theme */}
              <Image
                src="/icons/form/check.svg"
                alt=""
                width={31}
                height={24}
                className={cn(
                  "text-current",
                  props.checked ? "hidden" : "block dark:hidden",
                )}
                aria-hidden="true"
              />
              {/* Unchecked state - dark theme */}
              <Image
                src="/icons/form/check-dark.svg"
                alt=""
                width={31}
                height={24}
                className={cn(
                  "text-current",
                  props.checked ? "hidden" : "hidden dark:block",
                )}
                aria-hidden="true"
              />
            </div>
          )}
          {isNo && (
            <div className="relative flex h-6 w-6 items-center justify-center">
              {/* Checked state - always visible when checked */}
              <Image
                src="/icons/form/ban-checked.svg"
                alt=""
                width={24}
                height={24}
                className={cn(
                  "text-current",
                  props.checked ? "block" : "hidden",
                )}
                aria-hidden="true"
              />
              {/* Unchecked state - light theme */}
              <Image
                src="/icons/form/ban.svg"
                alt=""
                width={24}
                height={24}
                className={cn(
                  "text-current",
                  props.checked ? "hidden" : "block dark:hidden",
                )}
                aria-hidden="true"
              />
              {/* Unchecked state - dark theme */}
              <Image
                src="/icons/form/ban-dark.svg"
                alt=""
                width={24}
                height={24}
                className={cn(
                  "text-current",
                  props.checked ? "hidden" : "hidden dark:block",
                )}
                aria-hidden="true"
              />
            </div>
          )}
          {children}
        </div>
        <RadioGroupPrimitive.Indicator
          data-slot="radio-group-indicator"
          className="absolute inset-0 flex items-center justify-center"
        />
      </RadioGroupPrimitive.Item>
    );
  }

  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        "focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive relative inline-flex cursor-pointer items-center justify-center gap-2 rounded-md text-xs font-medium whitespace-nowrap transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50",
        "border border-gray-300 bg-white text-gray-700 shadow-xs hover:bg-gray-50 focus-visible:border-gray-300 focus-visible:ring-gray-100 disabled:border-gray-200 disabled:text-gray-300 dark:border-gray-400 dark:bg-gray-900 dark:text-gray-200",
        "data-[state=checked]:border-indigo-500 data-[state=checked]:bg-indigo-500 data-[state=checked]:text-white data-[state=checked]:hover:bg-indigo-600 data-[state=checked]:focus-visible:ring-indigo-100 dark:data-[state=checked]:border-indigo-500 dark:data-[state=checked]:bg-indigo-500 dark:data-[state=checked]:hover:bg-indigo-600",
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
