import { CircleArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { routes } from "~/lib/routes";

export default function HeroHeader() {
  return (
    <div className="max-w-[600px] space-y-6">
      <p className="text-xs font-semibold tracking-[0.15em] text-gray-500 uppercase dark:text-gray-400">
        Open Source
      </p>
      <h1
        id="hero-title"
        className="text-[48px] leading-[58px] font-bold text-gray-900 dark:text-white"
      >
        {"FLARE-AI: "}<span className="underline decoration-2 underline-offset-4">Fla</span>{"w "}<span className="underline decoration-2 underline-offset-4">Re</span>{"porting for "}<span className="underline decoration-2 underline-offset-4">AI</span>
      </h1>
      <p className="text-lg leading-8 text-gray-500 dark:text-gray-300">
        A community-driven platform for documenting AI vulnerabilities, biases
        and incidents, addressed to the appropriate organizations.
      </p>
      <div className="flex flex-wrap items-center gap-4">
        <Button
          asChild
          className="h-12 rounded-lg bg-gray-900 px-6 text-white shadow-xs hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
        >
          <Link href={routes.introductionReport}>
            Report Now <CircleArrowRight width={20} height={20} />
          </Link>
        </Button>
        <Button asChild variant="outline" className="h-12 rounded-lg px-6">
          <Link href={routes.aboutUs}>Learn More</Link>
        </Button>
      </div>
    </div>
  );
}
