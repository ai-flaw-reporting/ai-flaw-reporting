import { ResourceCard, type Resource } from "~/entities/resource";

export function ResourcesGrid({ resources }: { resources: Resource[] }) {
  return (
    <section aria-labelledby="resources-grid-title">
      <h2 id="resources-grid-title" className="sr-only">
        Available Resources
      </h2>
      <ul className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {resources.map((resource) => (
          <li key={resource.id}>
            <ResourceCard resource={resource} />
          </li>
        ))}
      </ul>
    </section>
  );
}
