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
  const resources = filterAndSortResources(
    resourcesData.filter((r) => !("disabled" in r && r.disabled)),
    filters,
  );
  return (
    <main className="flex-1 bg-[#F2F4F7] dark:bg-gray-900">
      <section
        id="resources"
        aria-labelledby="resources-title"
        className="bg-[url('/images/hero-background-mobile.png')] bg-cover bg-top md:bg-[url('/images/hero-background.png')] dark:bg-none"
      >
        <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-8 px-6 py-16 lg:px-21">
          <header className="flex flex-col items-center gap-3 text-center">
            <p className="text-xs font-semibold tracking-[0.15em] text-gray-500 uppercase dark:text-gray-400">
              Directory
            </p>
            <h1
              id="resources-title"
              className="text-[36px] leading-[44px] font-bold text-gray-900 dark:text-white"
            >
              Reporting Resources
            </h1>
            <p className="max-w-[555px] text-base leading-6 text-gray-500 dark:text-gray-300">
              Organizations and programs for disclosing AI vulnerabilities,
              highlighting scope, submission processes, and criteria for
              reporting.
            </p>
          </header>

          <Suspense>
            <ResourcesFilterBar />
          </Suspense>

          <ResourcesGrid resources={resources} />

          <InfoSections />
        </div>
      </section>

      <CtaSection />
    </main>
  );
}
