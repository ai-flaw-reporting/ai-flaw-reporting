import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { routes } from "~/lib/routes";
import { SaveStatus } from "./save-status";
import { StepIndicator } from "./step-indicator";
import { ThemeToggle } from "~/components/theme-toggle";
import { ProgressComponent } from "./progress";

export function AiFlawReportHeader() {
  return (
    <header className="w-full bg-gray-100 dark:bg-gray-900">
      <div className="bg-blue-ai h-8 w-full" aria-hidden="true" />
      <div className="mx-auto max-w-[1440px] space-y-7 px-8 pt-2 pb-8">
        <nav className="mb-3.5">
          <Link
            href={routes.home}
            className="text-md flex w-fit items-center gap-2 py-3.5 font-medium text-gray-500 dark:text-gray-200"
          >
            <ArrowLeft size={24} aria-hidden="true" /> Back to Home
          </Link>
        </nav>
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
