import Card from "./card";
import Image from "next/image";
import { routes } from "~/lib/routes";

export default function CardsContainer() {
  return (
    <section aria-labelledby="cta-title">
      <h2 id="cta-title" className="sr-only">
        Actions
      </h2>
      <div className="flex justify-center gap-4">
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
          title="Information & Resources"
          description="Explore helpful definitions, and other resources for reporting issues with AI systems."
          infoHint="Info about Information & Resources"
          action={{
            label: "Select",
            href: routes.resources,
            variant: "outline",
          }}
        />
        <Card
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
          title="AI Flaw"
          description="Generate flaw, vulnerability, and incident reports for AI systems. Automatically send reports to key stakeholders."
          infoHint="Info about AI Flaw"
          action={{
            label: "Report flaw",
            href: routes.report,
            variant: "outline",
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
          description="We’re building an open dashboard for AI flaw reports. Soon, you’ll be able to explore past reports and patterns."
          infoHint="Info about Dashboard"
          action={{
            label: "Open",
            href: routes.dashboard,
            tooltip: "We’re building an open dashboard for AI flaw reports.",
            variant: "outline",
          }}
        />
      </div>
    </section>
  );
}
