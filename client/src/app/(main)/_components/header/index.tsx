import { CircleArrowRight, SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { routes } from "~/lib/routes";
import { cn } from "~/lib/utils";

export default function Header() {
  const navLinkStyles =
    "py-2 text-sm font-medium text-gray-600 dark:text-gray-100";

  return (
    <>
      <header className="dark:bg-gray-800">
        <nav className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-21 py-3.5">
          <Link
            className="py-1.5 text-base font-semibold text-gray-800 dark:text-white"
            href={routes.home}
          >
            AI Flaw Reporting
          </Link>
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
              <Link className={navLinkStyles} href={routes.contact}>
                Contact
              </Link>
            </li>
            <li>
              <Button asChild className="hover:bg-blue-ai bg-[#2563EB]">
                <Link href={routes.report} className="text-sm font-semibold">
                  Report Now <CircleArrowRight width={20} height={20} />
                </Link>
              </Button>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
