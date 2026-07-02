import { TrendingDown, TrendingUp } from "lucide-react";

export const TREND_TYPES = {
  UP: "up",
  DOWN: "down",
  NEUTRAL: "neutral",
} as const;

export type TrendType = (typeof TREND_TYPES)[keyof typeof TREND_TYPES];

export const TREND_WORDS = {
  [TREND_TYPES.UP]: ["+", "growing", "improving"],
  [TREND_TYPES.DOWN]: ["-"],
  [TREND_TYPES.NEUTRAL]: [],
};

export const getTrendType = (text: string): TrendType => {
  const normalizedText = text.toLowerCase();

  if (TREND_WORDS[TREND_TYPES.UP].some((w) => normalizedText.includes(w)))
    return TREND_TYPES.UP;
  if (TREND_WORDS[TREND_TYPES.DOWN].some((w) => normalizedText.includes(w)))
    return TREND_TYPES.DOWN;
  return TREND_TYPES.NEUTRAL;
};

export const TREND_ICONS: Record<TrendType, React.ReactNode | null> = {
  [TREND_TYPES.UP]: (
    <TrendingUp aria-hidden="true" size={16} className="text-green-500" />
  ),
  [TREND_TYPES.DOWN]: (
    <TrendingDown aria-hidden="true" size={16} className="text-red-500" />
  ),
  [TREND_TYPES.NEUTRAL]: null,
};
