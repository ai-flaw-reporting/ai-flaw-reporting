import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "~/components/ui/button";
import { routes } from "~/lib/routes";

interface Partner {
  name: string;
  icon: string;
  width?: number;
  height?: number;
}

const partners: Partner[] = [
  { name: "OpenAI", icon: "/icons/resource/open-ai.svg" },
  { name: "Anthropic", icon: "/icons/resource/anthropic.svg" },
  { name: "Google", icon: "/icons/resource/google.svg" },
  { name: "HuggingFace", icon: "/icons/resource/hugging-face.svg" },
  { name: "CISA", icon: "/icons/resource/cisa.svg" },
  { name: "MITRE", icon: "/icons/resource/mitre.svg" },
  { name: "AVID", icon: "/icons/resource/avid.svg" },
  { name: "AIID", icon: "/icons/resource/ai-incident-database.svg" },
  { name: "OECD", icon: "/icons/resource/oecd.svg" },
];

function PartnerCard({ partner }: { partner: Partner }) {
  return (
    <div className="flex h-[59px] w-[104px] shrink-0 items-center justify-center rounded-xl border border-[#E5E7EB80] bg-[#F2F4F8] p-3 md:h-[96px] md:w-[168px] md:p-6">
      <Image
        src={partner.icon}
        alt={partner.name}
        width={40}
        height={40}
        className="h-6 w-auto max-w-[56px] object-contain opacity-60 md:h-10 md:max-w-[80px]"
      />
    </div>
  );
}

interface PartnersCarouselProps {
  subtitle?: string;
  showAboutLink?: boolean;
}

export default function PartnersCarousel({
  subtitle = "Organizations that have advised on the design and integration with Flare AI",
  showAboutLink = true,
}: PartnersCarouselProps) {
  return (
    <section className="overflow-hidden bg-white/60 px-4 py-5 md:px-8 dark:bg-gray-800/60">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-8">
        {/* Header */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex flex-col items-center">
            <h2 className="text-center text-xl leading-10 font-bold text-[#373D48] dark:text-gray-100">
              Partners & Collaborators
            </h2>
            <p className="text-center text-base leading-7 text-[#6C727F] dark:text-gray-400">
              {subtitle}
            </p>
          </div>
          {showAboutLink && (
            <Button asChild variant="outline" className="mt-2">
              <Link href={routes.aboutUs} className="text-sm font-bold">
                About Us <ArrowRight width={20} height={20} />
              </Link>
            </Button>
          )}
        </div>

        {/* Infinite scroll carousel */}
        <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="animate-scroll flex w-max gap-4">
            {/* First set */}
            {partners.map((partner) => (
              <PartnerCard key={partner.name} partner={partner} />
            ))}
            {/* Duplicate for seamless loop */}
            {partners.map((partner) => (
              <PartnerCard key={`${partner.name}-dup`} partner={partner} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
