"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { CircleArrowRight } from "lucide-react";
import { Button } from "~/components/ui/button";
import { ThemeToggle } from "~/components/theme-toggle";
import { routes } from "~/lib/routes";
import { cn } from "~/lib/utils";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const navLinkStyles =
    "block py-3 text-center text-base font-medium text-gray-600 dark:text-gray-100";

  return (
    <div className="lg:hidden">
      {/* Burger button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex h-[14px] w-[28px] cursor-pointer flex-col justify-between"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
      >
        <span
          className={cn(
            "block h-[1.72px] rounded-full bg-[#2D3282] transition-all duration-300 ease-in-out dark:bg-white",
            isOpen
              ? "w-full translate-y-[6.14px] rotate-45"
              : "w-full translate-y-0 rotate-0",
          )}
        />
        <span
          className={cn(
            "block h-[1.72px] w-full rounded-full bg-[#2D3282] transition-all duration-300 ease-in-out dark:bg-white",
            isOpen ? "scale-x-0 opacity-0" : "scale-x-100 opacity-100",
          )}
        />
        <span
          className={cn(
            "block h-[1.72px] rounded-full bg-[#2D3282] transition-all duration-300 ease-in-out dark:bg-white",
            isOpen
              ? "w-full -translate-y-[6.14px] -rotate-45"
              : "ml-auto w-[69%] translate-y-0 rotate-0",
          )}
        />
      </button>

      {/* Overlay */}
      <div
        className={cn(
          "fixed inset-0 top-16 z-40 bg-black/20 transition-opacity duration-300",
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        )}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile menu panel */}
      <nav
        className={cn(
          "fixed top-16 right-0 left-0 z-50 border-t border-gray-200 bg-white px-6 pb-6 shadow-lg transition-all duration-300 ease-in-out dark:border-gray-700 dark:bg-gray-800",
          isOpen
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-4 opacity-0",
        )}
      >
        <ul className="flex flex-col gap-1 pt-4">
          <li>
            <Link
              className={navLinkStyles}
              href={routes.resources}
              onClick={() => setIsOpen(false)}
            >
              Resources
            </Link>
          </li>
          <li>
            <Link
              className={navLinkStyles}
              href={routes.openSource}
              onClick={() => setIsOpen(false)}
            >
              Open Source
            </Link>
          </li>
          <li>
            <Link
              className={navLinkStyles}
              href={routes.aboutUs}
              onClick={() => setIsOpen(false)}
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              className={navLinkStyles}
              href={routes.contact}
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
          </li>
        </ul>

        <div className="mt-2 border-t border-gray-200 pt-4 dark:border-gray-700">
          <div className="flex justify-center">
            <ThemeToggle />
          </div>
          <Button
            asChild
            className="mt-4 w-full bg-[#2563EB] hover:bg-[#1d4ed8]"
          >
            <Link
              href={routes.report}
              className="text-sm font-bold"
              onClick={() => setIsOpen(false)}
            >
              Report Now <CircleArrowRight width={20} height={20} />
            </Link>
          </Button>
        </div>
      </nav>
    </div>
  );
}
