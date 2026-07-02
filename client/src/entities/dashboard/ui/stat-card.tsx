import Image from "next/image";

import { TrendIndicator } from "~/widgets/dashboard/impact-by-numbers/trend-indicator";
import type { StatItem } from "../model/types";

export function StatCard({ iconUrl, iconBg, label, value, trend }: StatItem) {
  return (
    <div className="flex flex-col gap-3">
      <div
        className="flex h-14 w-14 items-center justify-center rounded-full"
        style={{ backgroundColor: iconBg ?? "#F1F5F9" }}
      >
        <Image src={iconUrl} alt="" width={28} height={28} aria-hidden="true" />
      </div>

      <dd>
        <data
          className="text-gray-750 text-[28px] leading-9 font-bold dark:text-white"
          value={value}
        >
          {value}
        </data>
      </dd>
      <dt className="text-gray-neutral-450 text-md font-normal capitalize dark:text-gray-100">
        {label}
      </dt>
      {trend && <TrendIndicator text={trend} />}
    </div>
  );
}
