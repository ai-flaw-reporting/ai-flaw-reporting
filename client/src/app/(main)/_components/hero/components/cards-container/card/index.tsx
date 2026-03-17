"use client";

import { Info } from "lucide-react";
import { useId } from "react";
import { useRouter } from "next/navigation";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";

import { cn } from "~/lib/utils";

interface Action {
  label: string;
  href: string;
  variant?: "default" | "outline" | "secondary" | "ghost";
  disabled?: boolean;
  tooltip?: string;
}

interface Props {
  icon?: React.ReactNode;
  title: string;
  description: string;
  infoHint?: string;
  action: Action;
  highlighted?: boolean;
}

export default function CardComponent({
  icon,
  title,
  description,
  infoHint,
  action,
  highlighted = false,
}: Props) {
  const descId = useId();
  const titleId = useId();
  const customCursor = "cursor-[url('/icons/cursor.svg')_10_10,_pointer]";
  const router = useRouter();

  return (
    <Card
      onClick={() => {
        if (action.disabled) return;
        router.push(action.href);
      }}
      className={cn(
        `group w-full md:w-[270px] ${customCursor} bg-[#F9FAFB] pt-8 pr-5 pb-5 pl-5 text-center transition-colors duration-300 ease-in-out dark:bg-gray-900`,
        highlighted
          ? "border-[#7F56D9] md:order-1 lg:order-none dark:border-[#7F56D9]"
          : "border-gray-300 dark:border-gray-700",
        action.disabled && "pointer-events-none opacity-60",
      )}
    >
      <article
        aria-labelledby={titleId}
        aria-describedby={descId}
        className="flex h-full flex-col justify-between"
      >
        <CardHeader className="px-0">
          <CardTitle>
            {icon && icon}
            <div className="flex items-center justify-center gap-2">
              <h3
                id={titleId}
                className="text-base leading-6 font-bold text-black dark:text-white"
              >
                {title}
              </h3>
              <Tooltip>
                <TooltipTrigger
                  className="inline-flex items-center justify-center rounded focus:outline-none focus-visible:ring"
                  aria-label={`Info about ${title}`}
                  type="button"
                >
                  <Info
                    size={16}
                    aria-hidden="true"
                    className="text-gray-400"
                  />
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">{infoHint}</TooltipContent>
              </Tooltip>
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent className="px-0">
          <p
            id={descId}
            className="text-sm leading-5 text-gray-600 dark:text-gray-100"
          >
            {description}
          </p>
        </CardContent>

        <CardFooter className="mt-4 px-0">
          <Button
            variant={action.variant ?? "default"}
            disabled={action.disabled}
            className={cn(
              "w-full font-bold duration-300",
              "group-hover:border-[#2563EB] group-hover:bg-[#2563EB] group-hover:text-white",
              "dark:group-hover:border-[#2563EB] dark:group-hover:bg-[#2563EB] dark:group-hover:text-white",
              highlighted &&
                action.variant === "default" &&
                "border-[#2563EB] bg-[#2563EB] px-5 py-3 text-white hover:bg-[#1d4ed8] dark:hover:bg-[#1d4ed8]",
              customCursor,
            )}
          >
            {action.label}
          </Button>
        </CardFooter>
      </article>
    </Card>
  );
}
