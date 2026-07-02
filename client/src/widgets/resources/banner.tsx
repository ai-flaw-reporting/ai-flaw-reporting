import Link from "next/link";
import { CircleArrowRight } from "lucide-react";
import { routes } from "~/lib/routes";
import { cn } from "~/lib/utils";

export function ReportBanner({ className }: { className?: string }) {
  return (
    <div className={cn("border-t border-gray-200 bg-white px-6 py-16 dark:border-gray-700 dark:bg-gray-900", className)}>
      <div className="mx-auto max-w-[1280px]">
        <div className="rounded-xl border border-gray-200 bg-gray-50 px-8 py-12 text-center dark:border-gray-700 dark:bg-gray-800 md:px-16">
          <div className="mx-auto flex max-w-[600px] flex-col items-center gap-6">
            <div className="space-y-2">
              <h2 className="text-[32px] leading-[40px] font-bold text-gray-900 dark:text-white">
                Found something worth reporting?
              </h2>
              <p className="text-base leading-7 text-gray-500 dark:text-gray-300">
                Help improve AI safety by submitting a report. Whether it&apos;s
                a flaw, bug, or something that doesn&apos;t sit right, your
                insight can make a real difference.
              </p>
            </div>
            <Link
              href={routes.introductionReport}
              className="inline-flex h-11 items-center gap-2 rounded-lg bg-gray-900 px-6 text-sm font-medium text-white shadow-xs transition-colors hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-white"
            >
              Report a flaw
              <CircleArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
