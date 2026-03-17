export function InfoSections() {
  return (
    <section aria-labelledby="about-flaw-reporting" className="w-full">
      <h2 id="about-flaw-reporting" className="sr-only">
        About AI Flaw Reporting
      </h2>

      <div className="rounded-2xl border border-gray-300 bg-white px-6 py-8 md:px-10 md:py-10 dark:border-gray-500 dark:bg-gray-800">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-16">
          <article className="flex flex-col gap-4">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
              What is AI Flaw Reporting?
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              AI flaw reporting is the process of identifying, documenting, and
              disclosing safety issues, security vulnerabilities, or harmful
              behaviors in artificial intelligence systems. This includes issues
              like:
            </p>
            <ul className="list-outside list-disc pl-5 text-sm text-gray-600 dark:text-gray-300">
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

          <article className="flex flex-col gap-4">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
              Purpose of This Website
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              This platform provides a structured, standardized way to document
              AI flaws and incidents. Our goal is to:
            </p>
            <ul className="list-outside list-disc pl-5 text-sm text-gray-600 dark:text-gray-300">
              <li>
                Create comprehensive reports that can be submitted to
                appropriate organizations
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
        </div>
      </div>
    </section>
  );
}
