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
    <section className="bg-[#F1F5F9]/30 px-4 py-10 lg:px-[180px] lg:py-24 dark:bg-gray-900/30">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-16 lg:flex-row lg:items-center lg:justify-center lg:gap-16">
        {/* Left column */}
        <div className="flex max-w-[502px] flex-col gap-6">
          <div className="flex items-center gap-2 self-start rounded-full bg-[#3C83F6]/10 px-4 py-2">
            <Image
              src="/icons/about-us/partners-and-collaborators.svg"
              alt=""
              width={16}
              height={16}
            />
            <span className="text-base leading-5 font-medium text-[#3C83F6] lg:hidden">
              Our Mission
            </span>
            <span className="hidden text-base leading-5 font-medium text-[#3C83F6] lg:inline">
              Collaborators & Integrations
            </span>
          </div>
          <h2 className="text-[36px] leading-[40px] font-bold text-[#373D48] dark:text-gray-100">
            Who we are and
            <br />
            why we&apos;re doing this:
          </h2>
          <p className="text-lg leading-[29px] text-[#6C727F] dark:text-gray-400">
            A collective of academics from MIT, Stanford, Harvard, Northeastern,
            and Hugging Face reporting a tool of community-validated resources
            where fully standardized reports can be submitted to any
            stakeholders across ecosystems.
          </p>
        </div>

        {/* Right column — Process Steps card */}
        <div className="w-full max-w-[512px] rounded-3xl border border-[#E5E7EB80] bg-white/70 p-8 shadow-[0_2px_12px_-2px_#373D480F] dark:border-gray-700 dark:bg-gray-800/70 dark:shadow-none">
          <div className="flex flex-col">
            {PROCESS_STEPS.map((step, index) => (
              <div key={step.title}>
                {index > 0 && (
                  <div className="my-4 ml-6 h-6 w-0.5 bg-[#E5E7EB] dark:bg-gray-600" />
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
                    <p className="text-base leading-6 font-semibold text-[#373D48] dark:text-gray-100">
                      {step.title}
                    </p>
                    <p className="text-base leading-5 text-[#6C727F] dark:text-gray-400">
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
