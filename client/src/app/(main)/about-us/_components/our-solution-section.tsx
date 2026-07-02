export default function OurSolutionSection() {
  return (
    <section className="bg-white/60 px-6 py-12 lg:px-21 lg:py-24 dark:bg-gray-800/60">
      <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-4">
        <p className="text-xs font-semibold tracking-[0.15em] text-gray-500 uppercase dark:text-gray-400">
          Partners &amp; Collaborators
        </p>
        <h2 className="text-center text-[36px] leading-[40px] font-bold text-gray-900 dark:text-gray-100">
          Our solution
        </h2>
        <p className="max-w-[800px] text-center text-lg leading-7 text-gray-500 dark:text-gray-400">
          We teamed up with AI developers, AI researchers and red teamers,
          software security professionals, and civil society organizations to
          not only flag AI safety issues, but also contribute necessary
          information for developers to effectively triage the problem. Our flaw
          reporting tool lets anyone create and download their own flaw report,
          or submit to a range of stakeholders.
        </p>
      </div>
    </section>
  );
}
