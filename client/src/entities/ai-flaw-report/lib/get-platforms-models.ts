import { PLATFORM_CONFIGS } from "../model/form-data/reporter-details-data";

export const getPlatformsModels = (
  platformLabels: string[],
  huggingFaceModels: string[],
): string[] => {
  if (!platformLabels?.length) return [];

  const doesIncludeHuggingFace = platformLabels.includes("Hugging Face");

  const models = platformLabels.flatMap((platformLabel) => {
    const platform = PLATFORM_CONFIGS.find((p) => p.label === platformLabel);
    return platform?.models ?? [];
  });

  return doesIncludeHuggingFace ? [...models, ...huggingFaceModels] : models;
};
