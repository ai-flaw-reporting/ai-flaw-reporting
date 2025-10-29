import Image from "next/image";

import { TrendIndicator } from "~/widgets/dashboard/impact-by-numbers/trend-indicator";
import type { StatItem } from "../model/types";

export function StatCard({ iconUrl, label, value, trend }: StatItem) {
  return (
    <div className="flex min-w-[264px] flex-col items-center">
      <Image src={iconUrl} alt="" width={64} height={64} aria-hidden="true" />

      <dt className="text-gray-neutral-450 text-md order-2 mt-2 font-normal capitalize dark:text-gray-100">
        {label}
      </dt>
      <dd className="order-1 mt-4">
        <data
          className="text-gray-750 text-[28px] leading-9 font-bold dark:text-white"
          value={value}
        >
          {value}
        </data>
      </dd>
      <TrendIndicator text={trend} />
    </div>
  );
}
