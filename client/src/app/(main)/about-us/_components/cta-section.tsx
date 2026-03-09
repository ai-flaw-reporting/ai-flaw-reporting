import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { routes } from "~/lib/routes";

export default function CtaSection() {
  return (
    <section className="border-t border-gray-200 bg-white/30 px-4 py-12 dark:border-gray-700 dark:bg-gray-900/30">
      <div className="relative mx-auto max-w-[993px] overflow-hidden rounded-2xl border border-[#D2D7E1F5] bg-gradient-to-b from-[#3C83F61A] via-[#E7F0FE33] to-[#3C83F60D] px-2 py-6 md:rounded-3xl md:p-16 dark:border-gray-600 dark:from-[#3C83F630] dark:via-[#1e293b] dark:to-[#3C83F615]">
        <div className="pointer-events-none absolute -top-[127px] right-0 size-64 rounded-full bg-[#3C83F61A] blur-[40px] md:right-[-10px] dark:bg-[#3C83F630]" />

        <div className="relative z-10 flex flex-col items-center gap-4">
          <Image
            src="/icons/star.svg"
            alt=""
            aria-hidden="true"
            width={40}
            height={40}
          />

          <h2 className="text-gray-750 max-w-[350px] text-center text-4xl leading-[40px] font-bold md:max-w-[702px] dark:text-white">
            Ready to Contribute?
          </h2>

          <p className="text-md text-gray-neutral-450 max-w-[576px] text-center leading-7 dark:text-gray-300">
            Whether you&apos;re a researcher, developer, or concerned user —
            your reports help make AI safer for everyone.
          </p>

          <div className="flex w-full max-w-[350px] flex-col items-center gap-4 md:max-w-[702px] md:flex-row md:justify-center">
            <Link
              href={routes.report}
              className="text-md inline-flex h-11 items-center gap-2 rounded-md bg-[#3C83F6] px-8 leading-5 font-medium text-white shadow-[0_2px_12px_-2px_rgba(55,61,72,0.06)] transition-colors hover:bg-[#2563EB]"
            >
              Report an AI Flaw
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href={routes.contact}
              className="border-gray-neutral-200 text-md text-gray-750 inline-flex h-11 w-full items-center justify-center rounded-md border bg-white px-8 leading-5 font-medium transition-colors hover:bg-gray-50 md:w-auto dark:border-gray-500 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
