"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { Button } from "~/components/ui/button";
import { routes } from "~/lib/routes";

function InlineTooltip({ term, tooltip }: { term: string; tooltip: string }) {
  const [open, setOpen] = useState(false);

  return (
    <Tooltip open={open} onOpenChange={setOpen}>
      <TooltipTrigger asChild>
        <span
          className="inline-flex cursor-help items-baseline gap-0.5 underline decoration-gray-700/50 decoration-dotted underline-offset-2 dark:decoration-gray-400/50"
          onClick={() => setOpen((prev) => !prev)}
        >
          {term}
          <Info
            className="relative top-[1px] inline size-4 shrink-0 self-center text-gray-500 dark:text-gray-400"
            aria-hidden="true"
          />
        </span>
      </TooltipTrigger>
      <TooltipContent className="max-w-[280px]">{tooltip}</TooltipContent>
    </Tooltip>
  );
}

export function IntroductionContent() {
  return (
    <div className="flex flex-col items-center gap-8">
      <div className="flex flex-col items-center gap-4 text-center">
        <p className="text-sm font-bold text-indigo-500 md:hidden">
          Introduction
        </p>
        <h1 className="display-sm font-bold text-gray-800 dark:text-white">
          Report an AI Flaw or Incident
        </h1>
        <p className="text-md font-normal text-gray-600 md:text-sm dark:text-gray-400">
          Help make AI systems safer by documenting vulnerabilities and concerns
        </p>
      </div>

      <div className="flex w-full max-w-[792px] flex-col gap-10">
        <div className="form-item-card flex flex-col gap-4 !p-4 md:!p-8">
          <h2 className="hidden text-center text-xl font-semibold text-gray-800 md:block dark:text-white">
            Instructions:
          </h2>

          <p className="text-md text-center font-medium text-gray-700 md:text-left dark:text-gray-300">
            You are welcome to report any broadly-scoped{" "}
            <InlineTooltip
              term="flaw"
              tooltip="A set of conditions or behaviors that allow the violation of an explicit or implicit policy related to the safety, security, or other undesirable effects from use of the AI system."
            />
            ,{" "}
            <InlineTooltip
              term="vulnerability"
              tooltip="A set of conditions that may lead to an incident; commonly used by security professionals for software security threats."
            />
            , or{" "}
            <InlineTooltip
              term="incident"
              tooltip="A real-world event that has resulted in harm, loss, or policy violations."
            />{" "}
            relating to an AI system or model. We encourage reports with
            demonstrable risks, harms, or systematic concerns related to
            general-purpose AI systems.
          </p>

          <div className="border-b border-gray-200 pb-4 dark:border-gray-500">
            <h2 className="mb-2 text-center text-xl font-semibold text-gray-800 dark:text-white">
              This form will:
            </h2>
            <ul className="text-md list-disc space-y-1 pl-6 font-medium text-gray-700 dark:text-gray-300">
              <li>
                Help you generate a comprehensive,{" "}
                <InlineTooltip
                  term="machine-readable report"
                  tooltip="A structured report format that can be automatically processed and analyzed by other systems and tools."
                />
                , informed by security best practices.
              </li>
              <li>
                Elicit details that will make it easier to{" "}
                <InlineTooltip
                  term="review and triage"
                  tooltip="Triage is the process of assessing and prioritizing reports based on severity, impact, and urgency to determine appropriate response actions."
                />
                .
              </li>
              <li>
                Provide the option to automatically submit your report to a list
                of the{" "}
                <InlineTooltip
                  term="venues"
                  tooltip="Organizations, platforms, or channels where AI flaw reports can be submitted for review and action."
                />{" "}
                relevant for your flaw.
              </li>
            </ul>
          </div>

          <p className="text-md px-4 text-center font-medium text-gray-500 md:px-0 dark:text-gray-400">
            This form creates a report for you. Reports are handled in{" "}
            <InlineTooltip
              term="strict confidence"
              tooltip="Your report data is kept private and secure, and will only be shared with parties you explicitly authorize."
            />
            , and will not be saved or sent unless you choose to submit them.
          </p>
        </div>

        <div className="flex justify-center">
          <Button variant="indigo-default" size="lg" asChild>
            <Link href={routes.report}>
              Start
              <ChevronRight className="size-5" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
