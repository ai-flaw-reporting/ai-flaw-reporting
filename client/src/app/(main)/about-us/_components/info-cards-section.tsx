const LEFT_CARD = {
  title: "What is AI Flaw Reporting?",
  description:
    "AI flaw reporting is the process of identifying, documenting, and disclosing safety issues, security vulnerabilities, or harmful behaviors in artificial intelligence systems. This includes issues like:",
  items: [
    "Security vulnerabilities that could be exploited by malicious actors",
    "Safety issues that could cause real-world harm",
    "Bias, discrimination, or unfair treatment in AI outputs",
    "Unintended behaviors or capability overhang",
    "Privacy violations or data mishandling",
  ],
};

const RIGHT_CARD = {
  title: "Purpose of This Website",
  description:
    "This platform provides a structured, standardized way to document AI flaws and incidents. Our goal is to:",
  items: [
    "Create comprehensive reports that can be submitted to appropriate organizations",
    "Ensure consistent documentation standards across the AI safety community",
    "Facilitate responsible disclosure to AI developers and safety organizations",
    "Build a knowledge base for improving AI safety practices",
  ],
};

function InfoCard({
  card,
}: {
  card: { title: string; description: string; items: string[] };
}) {
  return (
    <article className="flex flex-1 flex-col gap-4 py-5">
      <h3 className="text-[28px] leading-[36px] font-bold text-gray-900 dark:text-gray-100">
        {card.title}
      </h3>
      <p className="text-base leading-[23px] text-gray-500 dark:text-gray-400">
        {card.description}
      </p>
      <ul className="flex flex-col gap-2">
        {card.items.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-400 dark:bg-gray-500" />
            <span className="text-base leading-[23px] text-gray-500 dark:text-gray-400">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </article>
  );
}

export default function InfoCardsSection() {
  return (
    <section className="bg-[#F1F5F9]/50 px-6 py-12 lg:px-21 dark:bg-gray-900/50">
      <div className="mx-auto w-full max-w-[1280px]">
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-24">
          <InfoCard card={LEFT_CARD} />
          <div className="hidden w-px bg-gray-200 dark:bg-gray-700 lg:block" />
          <InfoCard card={RIGHT_CARD} />
        </div>
      </div>
    </section>
  );
}
