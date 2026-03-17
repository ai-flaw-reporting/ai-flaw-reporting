import type { Resource } from "~/entities/resource/model/types";
import { ResourceCard } from "./resource-card";

export function ResourcesGrid({ resources }: { resources: Resource[] }) {
  return (
    <section aria-labelledby="resources-grid-title" className="w-full pb-8">
      <h2 id="resources-grid-title" className="sr-only">
        Available Resources
      </h2>
      <ul className="grid grid-cols-1 gap-[30px] sm:grid-cols-2 lg:grid-cols-3">
        {resources.map((resource) => (
          <li key={resource.id} className="flex">
            <ResourceCard resource={resource} />
          </li>
        ))}
      </ul>
    </section>
  );
}
