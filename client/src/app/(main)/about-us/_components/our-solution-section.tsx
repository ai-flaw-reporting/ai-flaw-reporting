import Image from "next/image";

export default function OurSolutionSection() {
  return (
    <section className="bg-white/60 px-4 py-12 lg:px-[180px] lg:py-24 dark:bg-gray-800/60">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-4">
        <div className="flex items-center gap-2 rounded-full bg-[#3C83F6]/10 px-4 py-2">
          <Image
            src="/icons/about-us/partners-and-collaborators.svg"
            alt=""
            width={16}
            height={16}
          />
          <span className="text-base leading-5 font-medium text-[#3C83F6]">
            Partners & Collaborators
          </span>
        </div>
        <h2 className="text-center text-[36px] leading-[40px] font-bold text-[#373D48] dark:text-gray-100">
          Our solution:
        </h2>
        <p className="max-w-[800px] text-center text-lg leading-7 text-[#6C727F] dark:text-gray-400">
          We teamed up with AI developers, AI researchers and red teamers,
          software security professionals, and civil society organizations to
          not only flag AI safety issues, but also contribute necessary
          information for developers to effectively triage the problem. Our
          tool, Flaw Report, lets anyone use our open form that allows people to
          download their own structured report, or submit to any stakeholders of
          their choosing.
        </p>
      </div>
    </section>
  );
}
