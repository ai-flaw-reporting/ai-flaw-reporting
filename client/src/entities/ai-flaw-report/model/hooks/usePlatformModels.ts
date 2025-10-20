"use client";

import { useMemo } from "react";
import { PLATFORM_CONFIGS } from "../form-data/reporter-details-data";

export function usePlatformModels() {
  const getModelsForPlatform = useMemo(
    () =>
      (platformLabel: string | undefined): readonly string[] => {
        if (!platformLabel) return [];

        const platform = PLATFORM_CONFIGS.find(
          (p) => p.label === platformLabel,
        );
        return platform?.models ?? [];
      },
    [],
  );

  return { getModelsForPlatform };
}
