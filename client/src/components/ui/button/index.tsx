import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "~/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors duration-200 ease-in-out cursor-pointer disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-gray-900 text-white hover:bg-gray-800 focus-visible:ring-gray-300 disabled:bg-gray-300 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-white dark:disabled:bg-gray-600",
        "indigo-default":
          "bg-gray-900 text-white focus-visible:ring-gray-300 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-white",
        outline:
          "border border-gray-300 text-gray-700 bg-background shadow-xs focus-visible:ring-gray-100 focus-visible:border-gray-300 dark:hover:bg-input/50 disabled:border-gray-200 disabled:text-gray-300 dark:border-gray-300 dark:bg-white dark:text-gray-700",
        secondary:
          "bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100 hover:text-gray-800 focus-visible:ring-gray-200 focus-visible:border-gray-200 disabled:border-gray-100 disabled:text-gray-300 disabled:bg-gray-50",
        ghost:
          "text-gray-600 hover:bg-gray-50 hover:text-gray-700 disabled:text-gray-300 focus-visible:ring-0",
        "ghost-primary":
          "text-gray-700 hover:bg-gray-50 hover:text-gray-800 disabled:text-gray-300 focus-visible:ring-0",
        link: "text-gray-700 hover:text-gray-800 disabled:text-gray-300 focus-visible:ring-0",
        "link-gray":
          "text-gray-600 hover:text-gray-700 disabled:text-gray-300 focus-visible:ring-0",
        destructive:
          "bg-error-600 text-white hover:bg-error-700 focus-visible:ring-error-100 disabled:bg-error-200",
        gradient:
          "border border-gray-300 text-gray-700 hover:text-white focus-visible:ring-0 disabled:border-gray-300 hover:bg-blue-ai",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
