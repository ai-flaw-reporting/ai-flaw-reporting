import Link from "next/link";
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
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { Info } from "lucide-react";
import { useId } from "react";
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

  return (
    <Card
      className={cn(
        `group max-w-[258px] ${customCursor} pt-6.5 pb-5 text-center`,
        action.disabled && "pointer-events-none opacity-60",
      )}
    >
      <article aria-labelledby={titleId} aria-describedby={descId}>
        <CardHeader className="px-5">
          <CardTitle>
            {icon && icon}
            <div className="flex items-center justify-center gap-2">
              <h3 id={titleId} className="text-md leading-7 font-semibold">
                {title}
              </h3>
              {infoHint && (
                <TooltipProvider>
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
                    <TooltipContent className="max-w-xs">
                      <p>{infoHint}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent className="px-5">
          <p id={descId} className="text-sm leading-5 text-gray-600">
            {description}
          </p>
        </CardContent>

        <CardFooter className="mt-4 px-5">
          <Button
            asChild
            variant={action.variant ?? "default"}
            disabled={action.disabled}
            className={`w-full ${customCursor} group-hover:bg-blue-ai font-semibold group-hover:border-transparent group-hover:text-white`}
          >
            <Link href={action.href}>{action.label}</Link>
          </Button>
        </CardFooter>
      </article>
    </Card>
  );
}
