import { SaveStatus } from "./save-status";
import { StepIndicator } from "./step-indicator";
import { ThemeToggle } from "~/components/theme-toggle";
import { ProgressComponent } from "./progress";

export function AiFlawReportHeader() {
  return (
    <header className="w-full bg-gray-100 dark:bg-gray-900">
      <div className="mx-auto max-w-[1440px] space-y-7 px-8 pt-8 pb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-between gap-8">
            <h1 className="dark:text-gray-25 text-xl font-bold text-gray-800">
              AI Flaw Reporting
            </h1>
            <SaveStatus />
          </div>
          <div className="flex items-center gap-3">
            <StepIndicator />
            <ThemeToggle />
          </div>
        </div>
        <ProgressComponent />
      </div>
    </header>
  );
}
