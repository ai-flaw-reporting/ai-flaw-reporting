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

type Action = {
  label: string;
  href: string;
  variant?: "default" | "outline" | "secondary" | "ghost";
  disabled?: boolean;
  tooltip?: string;
};

type Props = {
  icon?: React.ReactNode;
  title: string;
  description: string;
  infoHint?: string;
  action: Action;
};

export default function CardComponent({
  icon,
  title,
  description,
  infoHint,
  action,
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
        `group max-w-[258px] ${customCursor} border-gray-300 bg-white pt-6.5 pb-5 text-center dark:border-gray-700 dark:bg-gray-900`,
        action.disabled && "pointer-events-none opacity-60",
      )}
    >
      <article
        aria-labelledby={titleId}
        aria-describedby={descId}
        className="flex h-full flex-col justify-between"
      >
        <CardHeader className="px-5">
          <CardTitle>
            {icon && icon}
            <div className="flex items-center justify-center gap-2">
              <h3 id={titleId} className="text-md leading-7 font-semibold">
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

        <CardContent className="px-5">
          <p
            id={descId}
            className="text-sm leading-5 text-gray-600 dark:text-gray-100"
          >
            {description}
          </p>
        </CardContent>

        <CardFooter className="mt-4 px-5">
          <Button
            variant={action.variant ?? "default"}
            disabled={action.disabled}
            className={cn(
              "group-hover:bg-blue-ai w-full font-semibold group-hover:border-transparent group-hover:text-base group-hover:text-white dark:group-hover:border-none dark:group-hover:text-white",
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
