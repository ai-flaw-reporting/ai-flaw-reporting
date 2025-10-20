import { CircleArrowRight, SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { routes } from "~/lib/routes";
import { cn } from "~/lib/utils";

export default function Header() {
  const navLinkStyles = "py-2 text-sm font-medium text-gray-600";

  return (
    <>
      <header className="mx-auto w-full max-w-[1440px] px-21 py-3.5">
        <nav className="flex items-center justify-between">
          <Link
            className="py-1.5 text-base font-semibold text-gray-800"
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
