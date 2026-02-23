export default function Header() {
  return (
    <header className="mx-auto max-w-[462px] space-y-4">
      <h1
        id="hero-title"
        className="text-center text-[30px] leading-[38px] font-bold text-gray-800 dark:text-white"
      >
        Flare AI
      </h1>
      <p className="text-center text-sm leading-5 text-gray-600 dark:text-gray-100">
        This open-source project lets researchers securely report AI flaws,
        incidents, and vulnerabilities in AI systems safely and more securely.
      </p>
    </header>
  );
}
