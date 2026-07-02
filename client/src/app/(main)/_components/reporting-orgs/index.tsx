const orgs = [
  "Anthropic",
  "Hugging Face",
  "Cohere",
  "UK AI Safety Institute",
  "CERT/CC",
  "OECD",
  "AVID",
];

export default function ReportingOrgs() {
  return (
    <section className="bg-[#F2F4F7] px-6 py-16 dark:bg-gray-900 lg:px-21">
      <div className="mx-auto max-w-[1440px] space-y-8">
        <p className="text-center text-xs font-semibold tracking-[0.15em] text-gray-400 uppercase dark:text-gray-500">
          Reports are forwarded to
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {orgs.map((org) => (
            <span
              key={org}
              className="rounded-full border border-gray-300 bg-white px-4 py-1.5 text-sm font-medium text-gray-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
            >
              {org}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
