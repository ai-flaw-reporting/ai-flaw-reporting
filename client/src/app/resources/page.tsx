import type { Metadata } from "next";
import {
  filterAndSortResources,
  parseResourceFilters,
  resourcesData,
} from "~/entities/resource";
import { ResourcesFilterBar } from "~/features/resources-filter";

import {
  ResourcesHero,
  ResourcesGrid,
  AboutFlawReporting,
  ReportBanner,
} from "~/widgets/resources";

type PageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

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

export default async function ResourcesPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const filters = parseResourceFilters(params ?? {});
  const resources = filterAndSortResources(resourcesData, filters);

  return (
    <main className="bg-gray-100">
      <section
        id="resources"
        aria-labelledby="resources-title"
        className="bg-[url('/images/hero-background.png')] bg-[length:100%_736px] bg-top bg-no-repeat pt-17 dark:bg-gray-900 dark:bg-none"
      >
        <div className="mx-auto mb-8 flex max-w-[1344px] flex-col space-y-8 px-8">
          <header className="space-y-8">
            <ResourcesHero />
            <ResourcesFilterBar />
          </header>
          <ResourcesGrid resources={resources} />
          <AboutFlawReporting />
        </div>
        <ReportBanner />
      </section>
    </main>
  );
}
