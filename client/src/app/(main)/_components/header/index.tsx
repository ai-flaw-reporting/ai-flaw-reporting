import { CircleArrowRight, SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { ThemeToggle } from "~/components/theme-toggle";
import { MobileNav } from "./mobile-nav";
import { routes } from "~/lib/routes";
import { cn } from "~/lib/utils";

export default function Header() {
  const navLinkStyles =
    "py-2 text-sm font-medium text-gray-600 dark:text-gray-100";

  return (
    <header className="bg-white dark:bg-gray-800">
      <nav className="mx-auto flex h-16 w-full max-w-[1440px] items-center justify-between px-6 lg:px-21">
        <Link
          className="py-1.5 text-base font-bold text-gray-800 dark:text-white"
          href={routes.home}
        >
          AI Flaw Reporting
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 lg:flex">
          <ul className="flex items-center gap-8">
            <li>
              <Link className={navLinkStyles} href={routes.resources}>
                Resources
              </Link>
            </li>
            <li>
              <Link
                className={cn("flex items-center gap-2", navLinkStyles)}
                href={routes.openSource}
              >
                Open Source <SquareArrowOutUpRight width={14} height={14} />
              </Link>
            </li>
            <li>
              <Link className={navLinkStyles} href={routes.aboutUs}>
                About Us
              </Link>
            </li>
            <li>
              <Link className={navLinkStyles} href={routes.contact}>
                Contact
              </Link>
            </li>
            <li>
              <Button asChild className="bg-[#2563EB] hover:bg-[#1d4ed8]">
                <Link href={routes.report} className="text-sm font-bold">
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
