import Link from "next/link";
import { useWatch } from "react-hook-form";

import { useAiFlawFormContext } from "~/entities/ai-flaw-report/model/hooks/useAiFlawFormContext";
import MainHeader from "~/app/(main)/_components/header";

import { SaveStatus } from "./save-status";
import { StepIndicator } from "./step-indicator";
import { ThemeToggle } from "~/components/theme-toggle";
import { ProgressComponent } from "./progress";

export function AiFlawReportHeader() {
  const { control } = useAiFlawFormContext();
  const currentStep = useWatch({ control, name: "step" });

  if (currentStep === "SUBMISSION_SUCCESS") {
    return <MainHeader />;
  }

  return (
    <header className="w-full bg-gray-100 dark:bg-gray-900">
      <div className="mx-auto max-w-[1440px] space-y-7 px-4 pt-8 pb-8 sm:px-8">
        <div className="flex justify-center sm:hidden">
          <StepIndicator />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-8">
            <div className="sm:hidden">
              <ThemeToggle />
            </div>
            <Link href="/">
              <h1 className="dark:text-gray-25 text-xl font-bold text-gray-800">
                AI Flaw Reporting
              </h1>
            </Link>
            <div className="hidden sm:block">
              <SaveStatus />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="sm:hidden">
              <SaveStatus />
            </div>
            <div className="hidden sm:flex sm:items-center sm:gap-3">
              <StepIndicator />
              <ThemeToggle />
            </div>
          </div>
        </div>
        <ProgressComponent />
      </div>
    </header>
  );
}
