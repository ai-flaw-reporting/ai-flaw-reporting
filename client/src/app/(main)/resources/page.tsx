import type { Metadata } from "next";

import { Suspense } from "react";

import {
  parseResourceFilters,
  filterAndSortResources,
} from "~/entities/resource/lib/utils";
import resourcesData from "~/entities/resource/model/data.json";

import { ResourcesFilterBar } from "./_components/filter-bar";
import { ResourcesGrid } from "./_components/resources-grid";
import { CtaSection } from "./_components/cta-section";
import { InfoSections } from "./_components/info-sections";

export const metadata: Metadata = {
  title: "AI Flaw Reporting Resources",
  description:
    "Discover resources for reporting AI security vulnerabilities, incidents, and safety hazards. Find government agencies, civil society organizations, and AI developers committed to AI safety.",
  openGraph: {
    title: "AI Flaw Reporting Resources",
    description:
      "Comprehensive directory of resources for reporting AI security vulnerabilities, incidents, and safety hazards.",
    type: "website",
  },
};

type PageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ResourcesPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const filters = parseResourceFilters(params ?? {});
  const resources = filterAndSortResources(resourcesData, filters);
  return (
    <main className="bg-gray-100 dark:bg-gray-900">
      <section
        id="resources"
        aria-labelledby="resources-title"
        className="bg-[url('/images/hero-background-mobile.png')] bg-[length:100%_auto] bg-top bg-no-repeat pt-17 md:bg-[url('/images/hero-background.png')] md:bg-[length:100%_736px]"
      >
        <div className="mx-auto flex max-w-[1344px] flex-col items-center gap-8 px-4 pb-8 md:px-8">
          <header className="flex flex-col items-center gap-2 pt-8 md:gap-[31px]">
            <div className="flex max-w-[555px] flex-col items-center gap-2">
              <h1
                id="resources-title"
                className="display-sm text-center font-bold text-gray-800 dark:text-white"
              >
                <span className="hidden md:inline">Report </span>Resources
              </h1>
              <p className="md:text-md text-center text-sm text-gray-600 md:leading-[23px] dark:text-gray-300">
                This outlines organizations and programs for disclosing AI
                vulnerabilities, highlighting scope, submission processes, and
                criteria for reporting.
              </p>
            </div>
          </header>

          <Suspense>
            <ResourcesFilterBar />
          </Suspense>

          <ResourcesGrid resources={resources} />

          <InfoSections />
        </div>

        <CtaSection />
      </section>
    </main>
  );
}
