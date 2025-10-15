import { Card } from "~/components/ui/card";

export function AboutFlawReporting() {
  return (
    <Card className="px-20 py-8 hover:border-gray-300">
      <section
        aria-labelledby="about-flaw-reporting-title"
        className="flex justify-between"
      >
        <h2 id="about-flaw-reporting-title" className="sr-only">
          About AI Flaw Reporting
        </h2>

        <article
          aria-labelledby="what-is-flaw-reporting-title"
          className="max-w-[462px] space-y-4 py-5"
        >
          <h3
            id="what-is-flaw-reporting-title"
            className="display-sm font-bold text-gray-800"
          >
            What is AI Flaw Reporting?
          </h3>
          <p className="text-sm font-normal text-gray-600">
            AI flaw reporting is the process of identifying, documenting, and
            disclosing safety issues, security vulnerabilities, or harmful
            behaviors in artificial intelligence systems. This includes issues
            like:
          </p>
          <ul className="list-inside list-disc text-sm font-normal text-gray-600">
            <li>
              Security vulnerabilities that could be exploited by malicious
              actors
            </li>
            <li>Safety issues that could cause real-world harm</li>
            <li>Bias, discrimination, or unfair treatment in AI outputs</li>
            <li>Unintended behaviors or capability overhang</li>
            <li>Privacy violations or data mishandling</li>
          </ul>
        </article>

        <article
          aria-labelledby="purpose-of-site-title"
          className="max-w-[462px] space-y-4 py-5"
        >
          <h3
            id="purpose-of-site-title"
            className="display-sm font-bold text-gray-800"
          >
            Purpose of This Website
          </h3>
          <p className="text-sm font-normal text-gray-600">
            This platform provides a structured, standardized way to document AI
            flaws and incidents. Our goal is to:
          </p>
          <ul className="list-inside list-disc text-sm font-normal text-gray-600">
            <li>
              Create comprehensive reports that can be submitted to appropriate
              organizations
            </li>
            <li>
              Ensure consistent documentation standards across the AI safety
              community
            </li>
            <li>
              Facilitate responsible disclosure to AI developers and safety
              organizations
            </li>
            <li>Build a knowledge base for improving AI safety practices</li>
          </ul>
        </article>
      </section>
    </Card>
  );
}
