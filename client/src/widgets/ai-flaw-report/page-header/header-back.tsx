import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { routes } from "~/lib/routes";

export function HeaderBack() {
  return (
    <header className="w-full bg-gray-100 dark:bg-gray-900">
      <div className="h-8 w-full bg-gray-900 dark:bg-gray-800" aria-hidden="true" />
      <div className="mx-auto max-w-[1440px] space-y-7 px-8 pt-2 pb-8">
        <nav className="mb-3.5">
          <Link
            href={routes.home}
            className="text-md flex w-fit items-center gap-2 py-3.5 font-medium text-gray-500 dark:text-gray-200"
          >
            <ArrowLeft size={24} aria-hidden="true" /> Back to Home
          </Link>
        </nav>
      </div>
    </header>
  );
}
