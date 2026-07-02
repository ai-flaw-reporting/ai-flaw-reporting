import Card from "./card";
import Image from "next/image";
import { routes } from "~/lib/routes";

const cards = [
  /* {
    icon: (
      <Image
        src="icons/home/desktop-chart.svg"
        width={24}
        height={24}
        alt=""
        aria-hidden="true"
      />
    ),
    title: "View Reports",
    description:
      "Browse public AI flaw and incident reports submitted by the community.",
    ctaText: "Open dashboard",
    action: { href: routes.dashboard },
  }, */
  {
    icon: (
      <Image
        src="icons/bug.svg"
        width={24}
        height={24}
        alt=""
        aria-hidden="true"
      />
    ),
    title: "Create Report",
    description:
      "Document a flaw, vulnerability or incident in any AI system. Takes ~10 minutes.",
    ctaText: "Start",
    action: { href: routes.introductionReport },
    highlighted: true,
  },
  {
    icon: (
      <Image
        src="icons/home/document.svg"
        width={24}
        height={24}
        alt=""
        aria-hidden="true"
      />
    ),
    title: "Resources",
    description:
      "Reference materials from CERT, NIST, MITRE, and partner research labs.",
    ctaText: "Browse resources",
    action: { href: routes.resources },
  },
];

export default function HowItWorks() {
  return (
    <section
      aria-labelledby="how-it-works-title"
      className="bg-[#F2F4F7] px-6 py-16 dark:bg-gray-900 lg:px-21"
    >
      <div className="mx-auto max-w-[1440px] space-y-12">
        <div className="space-y-3 text-center">
          <p className="text-xs font-semibold tracking-[0.15em] text-gray-500 uppercase dark:text-gray-400">
            How It Works
          </p>
          <h2
            id="how-it-works-title"
            className="text-[36px] leading-[44px] font-bold text-gray-900 dark:text-white"
          >
            Ways to engage
          </h2>
          <p className="mx-auto max-w-[600px] text-lg text-gray-500 dark:text-gray-300">
            Whether you discovered a vulnerability, experienced harm, or want to
            follow what's happening, there's a path for you.
          </p>
        </div>

        <div className="flex flex-col gap-4 md:flex-row">
          {cards.map((card) => (
            <Card key={card.title} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}
