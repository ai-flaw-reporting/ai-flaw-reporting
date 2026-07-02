import { getTrendType, TREND_ICONS } from "~/entities/dashboard/lib/trend";

type Props = {
  text: string;
};

export function TrendIndicator({ text }: Props) {
  const trendType = getTrendType(text);

  return (
    <small className="order-3 mt-1 flex items-center gap-1 text-sm font-normal text-green-500">
      {TREND_ICONS[trendType]} {text}
    </small>
  );
}
