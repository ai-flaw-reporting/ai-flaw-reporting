import Image from "next/image";
import { cn } from "~/lib/utils";

type ProviderType = "openai" | "anthropic" | "google" | "claude" | null;

interface ProviderBadgeProps {
  url: string;
}

const PROVIDER_CONFIG: Record<Exclude<ProviderType, null>, { icon: string }> = {
  openai: {
    icon: "/icons/resource/open-ai.svg",
  },
  anthropic: {
    icon: "/icons/resource/anthropic.svg",
  },
  google: {
    icon: "/icons/resource/google.svg",
  },
  claude: {
    icon: "/icons/resource/claude.svg",
  },
};

const INVERT_ICONS = ["anthropic.svg", "open-ai.svg"];

function detectProvider(url: string): ProviderType {
  if (!url) return null;

  const lowerUrl = url.toLowerCase();

  if (lowerUrl.includes("openai.com")) return "openai";
  if (lowerUrl.includes("anthropic.com")) return "anthropic";
  if (lowerUrl.includes("claude.ai")) return "claude";
  if (lowerUrl.includes("google.com") || lowerUrl.includes("google.ai"))
    return "google";

  return null;
}

export function ProviderBadge({ url }: ProviderBadgeProps) {
  const provider = detectProvider(url);

  if (!provider) return null;

  const config = PROVIDER_CONFIG[provider];
  const shouldInvert = INVERT_ICONS.some((name) => config.icon.includes(name));

  return (
    <div className="absolute top-1/2 left-3 z-10 flex -translate-y-1/2 items-center rounded bg-white p-1 shadow-sm dark:bg-gray-800">
      <Image
        src={config.icon}
        alt=""
        aria-hidden="true"
        width={16}
        height={16}
        className={cn(shouldInvert && "dark:invert")}
      />
    </div>
  );
}
