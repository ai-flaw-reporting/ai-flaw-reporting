import * as React from "react";
import { cn } from "~/lib/utils";

function Input({ className, type, value, ...props }: React.ComponentProps<"input">) {
  const controlledValue = value ?? "";

  return (
    <input
      type={type}
      data-slot="input"
      value={controlledValue}
      className={cn(
        "file:text-foreground selection:bg-primary selection:text-primary-foreground border-input text-md w-full min-w-0 rounded-md border bg-transparent px-3 py-2 shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-300 dark:bg-gray-800",
        "focus-visible:border-ring focus-visual:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
