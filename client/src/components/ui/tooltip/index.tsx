"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import { cn } from "~/lib/utils";

function TooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  );
}

function TooltipTrigger({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}

function TooltipContent({
  className,
  sideOffset = 0,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  // Don't render tooltip if there's no content
  if (!children || (typeof children === "string" && children.trim() === "")) {
    return null;
  }
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          "bg-foreground text-background animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance",
          className,
        )}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow className="bg-foreground fill-foreground z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}

// Helper function to check if TooltipContent has content
function hasTooltipContent(
  children: React.ReactNode,
  TooltipContentComponent: typeof TooltipContent,
): boolean {
  let hasContent = false;

  React.Children.forEach(children, (child) => {
    if (hasContent) return;

    if (React.isValidElement(child)) {
      // Check if this is a TooltipContent component by comparing the function
      if (child.type === TooltipContentComponent) {
        const props = child.props as { children?: React.ReactNode };
        const content = props.children;
        if (content && (typeof content !== "string" || content.trim() !== "")) {
          hasContent = true;
        }
      } else {
        const props = child.props as { children?: React.ReactNode };
        if (props.children) {
          // Recursively check nested children
          hasContent = hasTooltipContent(
            props.children,
            TooltipContentComponent,
          );
        }
      }
    }
  });

  return hasContent;
}

function Tooltip({
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  // Don't render tooltip if TooltipContent has no content
  if (!hasTooltipContent(children, TooltipContent)) {
    return null;
  }

  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...props}>
        {children}
      </TooltipPrimitive.Root>
    </TooltipProvider>
  );
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
