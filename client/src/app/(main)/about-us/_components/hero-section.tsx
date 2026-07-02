import { CircleArrowRight, FileText, SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { routes } from "~/lib/routes";

export default function HeroSection() {
  return (
    <section className="bg-[url('/images/about-us-bg-mobile.png')] bg-cover bg-top md:bg-[url('/images/about-us-bg.png')] dark:bg-gray-900 dark:bg-none">
      <div className="mx-auto flex min-h-[400px] max-w-[1440px] flex-col items-center justify-center px-6 py-9 lg:min-h-[524px] lg:px-21">
        <div className="flex flex-col items-center gap-5 pt-8">
          <p className="text-xs font-semibold tracking-[0.15em] text-gray-500 uppercase dark:text-gray-400">
            Open Source
          </p>
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-center text-[36px] leading-[44px] font-bold text-gray-900 dark:text-white">
              Flaw Reporting for AI
              <br />
              <span className="text-[28px] font-semibold text-gray-400 dark:text-gray-500">
                FLARE-AI
              </span>
            </h1>
            <p className="max-w-[600px] text-center text-base leading-6 text-gray-500 dark:text-gray-300">
              We are researchers trying to streamline AI flaw and incident
              reporting, to connect issues with those who can fix them.
            </p>
          </div>
          <div className="flex w-full flex-wrap justify-center gap-3 md:w-auto">
            <Button
              asChild
              className="h-11 rounded-lg bg-gray-900 px-6 text-white shadow-xs hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-white"
            >
              <Link href={routes.introductionReport}>
                Report Now <CircleArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-11 rounded-lg px-6"
            >
              <Link href={routes.openSource}>
                Open Source <SquareArrowOutUpRight className="size-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-11 rounded-lg px-6"
            >
              <a
                href="https://arxiv.org/abs/2606.31567"
                target="_blank"
                rel="noopener noreferrer"
              >
                Read the Paper <FileText className="size-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
