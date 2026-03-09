export default function Header() {
  return (
    <header className="mx-auto max-w-[462px] space-y-4">
      <h1
        id="hero-title"
        className="text-center text-[30px] leading-[38px] font-bold text-gray-800 dark:text-white"
      >
        Report AI Flaws & Incidents
      </h1>
      <p className="text-center text-sm leading-5 text-gray-600 dark:text-gray-100">
        This open-source project lets you generate your own AI flaw / incident
        reports, and optionally send them to stakeholders. Your voice helps make
        AI safer and more secure.
      </p>
    </header>
  );
}
