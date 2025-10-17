export default function Header() {
  return (
    <header className="mx-auto max-w-[462px] space-y-4">
      <h1
        id="hero-title"
        className="display-sm text-center font-bold text-gray-800 dark:text-white"
      >
        Help Make AI Safer for Everyone
      </h1>
      <p className="text-center text-sm leading-5 text-gray-600 dark:text-gray-100">
        This open-source project by Harvard researchers lets you securely report
        AI flaws and vulnerabilities. Your voice helps shape safer, more ethical
        AI systems.
      </p>
    </header>
  );
}
