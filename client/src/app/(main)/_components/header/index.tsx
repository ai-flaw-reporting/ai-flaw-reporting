import { CircleArrowRight, SquareArrowOutUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { ThemeToggle } from "~/components/theme-toggle";
import { MobileNav } from "./mobile-nav";
import { routes } from "~/lib/routes";

export default function Header() {
  return (
    <header className="bg-white dark:bg-gray-800">
      <nav className="mx-auto flex h-16 w-full max-w-[1440px] items-center justify-between px-6 lg:px-21">
        <Link href={routes.home}>
          <Image
            src="/icons/header-logo.svg"
            alt="AI Flaw Report"
            width={142}
            height={24}
            className="dark:brightness-0 dark:invert"
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 lg:flex">
          <ul className="flex items-center gap-8">
            <li>
              <Link
                className="py-2 text-sm leading-5 font-medium text-gray-600 dark:text-gray-100"
                href={routes.resources}
              >
                Resources
              </Link>
            </li>
            <li>
              <Link
                className="flex items-center gap-2 py-2 text-sm leading-5 font-bold text-gray-600 dark:text-gray-100"
                href={routes.openSource}
              >
                Open Source <SquareArrowOutUpRight width={14} height={14} />
              </Link>
            </li>
            <li>
              <Link
                className="flex h-9 w-36 items-center justify-center rounded-xl bg-[#F2F4F8] text-sm leading-5 font-bold text-indigo-500 dark:bg-gray-700 dark:text-indigo-500"
                href={routes.aboutUs}
              >
                About the Project
              </Link>
            </li>
            <li>
              <Button
                asChild
                variant="indigo-default"
                className="rounded-lg shadow-xs"
              >
                <Link
                  href={routes.introductionReport}
                  className="text-sm font-bold"
                >
                  Report Now <CircleArrowRight width={20} height={20} />
                </Link>
              </Button>
            </li>
          </ul>
          <ThemeToggle />
        </div>

        {/* Mobile nav */}
        <MobileNav />
      </nav>
    </header>
  );
}
