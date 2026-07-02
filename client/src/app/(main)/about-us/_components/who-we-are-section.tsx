import Image from "next/image";

const PROCESS_STEPS = [
  {
    icon: "/icons/about-us/issue-discovered.svg",
    title: "Issue Discovered",
    description: "Researchers and users identify AI vulnerabilities",
  },
  {
    icon: "/icons/about-us/report-submitted.svg",
    title: "Report Submitted",
    description: "Structured data collected through our platform",
  },
  {
    icon: "/icons/about-us/triaged-and-routed.svg",
    title: "Triaged & Routed",
    description: "Connected to appropriate organizations",
  },
  {
    icon: "/icons/about-us/ai-made-safer.svg",
    title: "AI Made Safer",
    description: "Issues addressed, community protected",
  },
];

export default function WhoWeAreSection() {
  return (
    <section className="bg-[#F1F5F9]/50 px-6 py-12 lg:px-21 lg:py-24 dark:bg-gray-900/50">
      <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-16 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
        <div className="flex max-w-[502px] flex-col gap-6">
          <p className="text-xs font-semibold tracking-[0.15em] text-gray-500 uppercase dark:text-gray-400">
            Collaborators &amp; Integrations
          </p>
          <h2 className="text-[36px] leading-[40px] font-bold text-gray-900 dark:text-gray-100">
            Who we are and why we&apos;re doing this
          </h2>
          <p className="text-lg leading-[29px] text-gray-500 dark:text-gray-400">
            Researchers from MIT, Stanford, Harvard, Northeastern, and Hugging
            Face built this tool, in collaboration with cybersecurity experts, to
            allow the community to submit fully standardized AI flaw reports to
            stakeholders across the ecosystem.
          </p>
        </div>

        <div className="w-full max-w-[480px] rounded-xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="flex flex-col">
            {PROCESS_STEPS.map((step, index) => (
              <div key={step.title}>
                {index > 0 && (
                  <div className="my-4 ml-6 h-6 w-0.5 bg-gray-200 dark:bg-gray-600" />
                )}
                <div className="flex items-start gap-4">
                  <Image
                    src={step.icon}
                    alt=""
                    width={48}
                    height={48}
                    className="shrink-0"
                  />
                  <div className="flex flex-col gap-1">
                    <p className="text-base leading-6 font-semibold text-gray-900 dark:text-gray-100">
                      {step.title}
                    </p>
                    <p className="text-base leading-5 text-gray-500 dark:text-gray-400">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
