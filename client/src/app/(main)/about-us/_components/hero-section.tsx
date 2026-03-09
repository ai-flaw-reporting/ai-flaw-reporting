import { ArrowRight, SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { routes } from "~/lib/routes";

export default function HeroSection() {
  return (
    <section className="bg-[url('/images/about-us-bg-mobile.png')] bg-cover bg-top md:bg-[url('/images/about-us-bg.png')] dark:bg-gray-900 dark:bg-none">
      <div className="mx-auto flex min-h-[400px] max-w-[1440px] flex-col items-center justify-center px-4 py-9 lg:min-h-[524px] lg:px-[180px]">
        <div className="flex flex-col items-center gap-5 pt-8">
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-center text-[36px] leading-[44px] font-bold text-gray-900 dark:text-white">
              Making AI Safer
              <br />
              <span className="text-indigo-500">For Everyone</span>
            </h1>
            <p className="max-w-[672px] text-center text-base leading-6 font-medium text-[#475467] dark:text-gray-300">
              We&apos;re a research initiative dedicated to building the
              infrastructure for responsible AI development and deployment. Our
              platform connects those who discover AI issues with those who can
              fix them.
            </p>
          </div>
          <div className="flex w-full justify-center gap-2 md:w-auto">
            <Button
              asChild
              variant="indigo-default"
              className="flex-1 rounded-lg shadow-xs md:flex-initial"
            >
              <Link href={routes.report} className="text-sm font-bold">
                Report Now <ArrowRight width={20} height={20} />
              </Link>
            </Button>
            <Button
              asChild
              className="flex-1 rounded-lg border border-indigo-500 bg-[#F5F8FF] text-sm font-bold text-indigo-500 shadow-xs hover:bg-[#F5F8FF]/80 md:flex-initial dark:bg-transparent"
            >
              <Link href={routes.openSource}>
                Open Source <SquareArrowOutUpRight width={20} height={20} />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
