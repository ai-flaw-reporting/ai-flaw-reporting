import Link from "next/link";
import Image from "next/image";
import { routes } from "~/lib/routes";

const footerLinks = {
  Product: [
    { label: "Home", href: routes.home },
    { label: "Report a flaw", href: routes.introductionReport },
  ],
  Project: [
    { label: "About us", href: routes.aboutUs },
    { label: "Resources", href: routes.resources },
    { label: "Contact", href: routes.contact },
  ]
};

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white px-6 py-12 dark:border-gray-700 dark:bg-gray-800 lg:px-21">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-12 md:flex-row md:gap-16">
        {/* Brand */}
        <div className="max-w-[320px] space-y-4">
          <div className="flex items-center gap-2">
            <Image
              src="/images/logo.png"
              alt="FLARE-AI logo"
              width={32}
              height={32}
              className="object-contain"
              aria-hidden="true"
            />
            <span className="text-lg font-bold text-[#1F235B] dark:text-white">
              FLARE-AI
            </span>
          </div>
          <p className="text-sm leading-6 text-gray-500 dark:text-gray-400">
            An open-source project to make AI flaw and incident reporting easy,
            secure, and accessible.
          </p>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-3 gap-8 md:ml-auto">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
