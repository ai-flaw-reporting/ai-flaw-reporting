import Image from "next/image";

interface Partner {
  name: string;
  icon: string;
  large?: boolean;
}

const partners: Partner[] = [
  {
    name: "Carnegie Mellon University Software Engineering Institute",
    icon: "/icons/resource/cmu.svg",
    large: true,
  },
  // { name: "OECD.AI", icon: "/icons/resource/oecd.svg", large: true },
  { name: "HuggingFace", icon: "/icons/resource/hugging-face.svg" },
  { name: "AVID", icon: "/icons/resource/avid.svg" },
  // { name: "AI Incident Database", icon: "/icons/resource/ai-incident-database.svg" },
];

function PartnerLogo({ partner }: { partner: Partner }) {
  return (
    <div className="flex items-center justify-center px-4 py-2">
      <Image
        src={partner.icon}
        alt={partner.name}
        width={120}
        height={40}
        className={`w-auto object-contain opacity-60 grayscale transition-opacity hover:opacity-80 dark:invert ${
          partner.large
            ? "h-8 max-w-[110px] md:h-10 md:max-w-[140px]"
            : "h-6 max-w-[80px] md:h-8 md:max-w-[100px]"
        }`}
      />
    </div>
  );
}

interface PartnersCarouselProps {
  subtitle?: string;
  showAboutLink?: boolean;
}

export default function PartnersCarousel({
  subtitle,
  showAboutLink: _showAboutLink = true,
}: PartnersCarouselProps) {
  return (
    <section className="bg-[#F2F4F7] px-6 py-16 dark:bg-gray-900 lg:px-21">
      <div className="mx-auto max-w-[1440px] space-y-10">
        <p className="text-center text-xs font-semibold tracking-[0.15em] text-gray-400 uppercase dark:text-gray-500">
          {subtitle ?? "In the company of"}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-6">
          {partners.map((partner) => (
            <PartnerLogo key={partner.name} partner={partner} />
          ))}
        </div>
      </div>
    </section>
  );
}
