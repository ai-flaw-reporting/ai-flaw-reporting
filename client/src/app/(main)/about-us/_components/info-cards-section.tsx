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
      <h3 className="text-[30px] leading-[38px] font-bold text-[#1D2939] dark:text-gray-100">
        {card.title}
      </h3>
      <p className="text-base leading-[23px] text-[#475467] dark:text-gray-400">
        {card.description}
      </p>
      <ul className="flex flex-col gap-2">
        {card.items.map((item) => (
          <li key={item} className="flex items-start gap-4">
            <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#475467] dark:bg-gray-400" />
            <span className="text-base leading-[23px] text-[#475467] dark:text-gray-400">
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
    <section className="bg-white/60 px-4 py-8 lg:px-20 dark:bg-gray-800/60">
      <div className="mx-auto w-full max-w-[1440px] px-6 py-8 lg:px-20">
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-[194px]">
          <InfoCard card={LEFT_CARD} />
          <InfoCard card={RIGHT_CARD} />
        </div>
      </div>
    </section>
  );
}
