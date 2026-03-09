import Card from "./card";
import Image from "next/image";
import { routes } from "~/lib/routes";

export default function CardsContainer() {
  return (
    <section aria-labelledby="cta-title">
      <h2 id="cta-title" className="sr-only">
        Actions
      </h2>
      <div className="flex w-full flex-col items-center gap-4 md:flex-row md:flex-wrap md:items-stretch md:justify-center lg:flex-nowrap">
        <Card
          icon={
            <Image
              src={"icons/home/document.svg"}
              width={27}
              height={36}
              alt="Document"
              aria-hidden="true"
              className="mx-auto mb-6"
            />
          }
          title="AI Reporting Resources"
          description="Explore helpful definitions, and other resources for reporting issues with AI systems."
          action={{
            label: "Select",
            href: routes.resources,
            variant: "outline",
          }}
        />
        <Card
          highlighted
          icon={
            <Image
              src={"icons/bug.svg"}
              width={36}
              height={36}
              alt="Bug"
              aria-hidden="true"
              className="mx-auto mb-6"
            />
          }
          title="Create Report"
          description="Generate flaw, vulnerability, and incident reports for AI systems. Automatically send reports to key stakeholders."
          action={{
            label: "Report flaw",
            href: routes.report,
            variant: "default",
          }}
        />
        <Card
          icon={
            <Image
              src={"icons/home/desktop-chart.svg"}
              width={36}
              height={36}
              alt="Dashboard"
              aria-hidden="true"
              className="mx-auto mb-6"
            />
          }
          title="Dashboard"
          description="A dashboard to see public AI flaw reports."
          action={{
            label: "Select",
            href: routes.dashboard,
            variant: "outline",
          }}
        />
      </div>
    </section>
  );
}
