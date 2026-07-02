import Link from "next/link";
import { CircleArrowRight } from "lucide-react";
import { routes } from "~/lib/routes";

export function CtaSection() {
  return (
    <div className="border-t border-gray-200 bg-white px-6 py-16 dark:border-gray-700 dark:bg-gray-900">
      <div className="mx-auto max-w-[1280px]">
        <div className="rounded-xl border border-gray-200 bg-gray-50 px-8 py-12 text-center dark:border-gray-700 dark:bg-gray-800 md:px-16">
          <div className="mx-auto flex max-w-[600px] flex-col items-center gap-6">
            <div className="space-y-2">
              <h2 className="text-[32px] leading-[40px] font-bold text-gray-900 dark:text-white">
                Ready to contribute?
              </h2>
              <p className="text-base leading-7 text-gray-500 dark:text-gray-300">
                Whether you&apos;re a researcher, developer, or concerned user,
                your reports help make AI safer for everyone.
              </p>
            </div>
            <div className="flex flex-col items-center gap-3 sm:flex-row">
              <Link
                href={routes.introductionReport}
                className="inline-flex h-11 items-center gap-2 rounded-lg bg-gray-900 px-6 text-sm font-medium text-white shadow-xs transition-colors hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-white"
              >
                Report an AI Flaw
                <CircleArrowRight className="size-4" />
              </Link>
              <Link
                href={routes.contact}
                className="inline-flex h-11 items-center justify-center rounded-lg border border-gray-300 bg-white px-6 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
