import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";

export function TitleTooltip({
  text,
  ariaLabel,
}: {
  text: string;
  ariaLabel: string;
}) {
  return (
    <Tooltip>
      <TooltipTrigger
        aria-label={ariaLabel}
        className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
      >
        <Info className="h-4 w-4" aria-hidden="true" />
      </TooltipTrigger>
      <TooltipContent>{text}</TooltipContent>
    </Tooltip>
  );
}
