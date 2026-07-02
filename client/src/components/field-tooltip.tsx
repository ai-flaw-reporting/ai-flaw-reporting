import { CircleQuestionMark } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { cn } from "~/lib/utils";

export function FieldTooltip({
  text,
  ariaLabel,
  className,
}: {
  text?: string;
  ariaLabel: string;
  className?: string;
}) {
  if (!text) return null;

  return (
    <Tooltip>
      <TooltipTrigger
        aria-label={ariaLabel}
        className={cn(
          "absolute top-3 right-3 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300",
          className,
        )}
      >
        <CircleQuestionMark className="h-4 w-4" aria-hidden="true" />
      </TooltipTrigger>
      <TooltipContent>{text}</TooltipContent>
    </Tooltip>
  );
}
