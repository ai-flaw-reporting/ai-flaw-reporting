import { CircleArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "~/components/ui/button";
import { ThemeToggle } from "~/components/theme-toggle";
import { MobileNav } from "./mobile-nav";
import { routes } from "~/lib/routes";

export default function Header() {
  return (
    <header className="bg-white dark:bg-gray-800">
      <nav className="mx-auto flex h-16 w-full max-w-[1440px] items-center justify-between px-6 lg:px-21">
        <Link href={routes.home} className="flex items-center gap-2">
          <Image
            src="/images/logo.png"
            alt="FLARE-AI logo"
            width={32}
            height={32}
            className="object-contain"
          />
          <span className="text-lg font-bold text-[#1F235B] dark:text-white">
            FLARE-AI
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-6 lg:flex">
          <ul className="flex items-center gap-8">
            <li>
              <Link
                className="py-2 text-sm leading-5 font-medium text-gray-600 dark:text-gray-100"
                href={routes.aboutUs}
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                className="py-2 text-sm leading-5 font-medium text-gray-600 dark:text-gray-100"
                href={routes.resources}
              >
                Resources
              </Link>
            </li>
            {/* <li>
              <Link
                className="py-2 text-sm leading-5 font-medium text-gray-600 dark:text-gray-100"
                href={routes.dashboard}
              >
                Database
              </Link>
            </li> */}
            <li>
              <Link
                className="py-2 text-sm leading-5 font-medium text-gray-600 dark:text-gray-100"
                href={routes.openSource}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </Link>
            </li>
            <li>
              <Button
                asChild
                className="rounded-lg bg-gray-900 text-white shadow-xs hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-white"
              >
                <Link
                  href={routes.introductionReport}
                  className="text-sm font-semibold"
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
