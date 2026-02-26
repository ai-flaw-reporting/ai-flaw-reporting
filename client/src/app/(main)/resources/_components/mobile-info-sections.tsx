export function MobileInfoSections() {
  return (
    <div className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-8 md:hidden">
      <section aria-labelledby="about-flaw-reporting-mobile">
        <h2 id="about-flaw-reporting-mobile" className="sr-only">
          About AI Flaw Reporting
        </h2>

        <article className="flex flex-col gap-4 py-5">
          <h3 className="display-sm font-bold text-gray-800">
            What is AI Flaw Reporting?
          </h3>
          <p className="text-sm text-gray-600">
            AI flaw reporting is the process of identifying, documenting, and
            disclosing safety issues, security vulnerabilities, or harmful
            behaviors in artificial intelligence systems. This includes issues
            like:
          </p>
          <ul className="list-inside list-disc text-sm text-gray-600">
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

        <article className="flex flex-col gap-4 py-5">
          <h3 className="display-sm font-bold text-gray-800">
            Purpose of This Website
          </h3>
          <p className="text-sm text-gray-600">
            This platform provides a structured, standardized way to document AI
            flaws and incidents. Our goal is to:
          </p>
          <ul className="list-inside list-disc text-sm text-gray-600">
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
    </div>
  );
}
