"use server";

import { getSafeArray } from "~/lib/form-field-utils";
type HuggingFaceModel = {
  modelId?: string;
  id?: string;
};

export async function fetchHuggingFaceModels(): Promise<string[]> {
  try {
    const apiUrl = "https://huggingface.co/api/models";
    const params = new URLSearchParams({
      sort: "downloads",
      direction: "-1",
    });

    const response = await fetch(`${apiUrl}?${params}`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return [];
    }

    const data: unknown = await response.json();

    const modelsData = getSafeArray<HuggingFaceModel>(data);
    const modelNames = modelsData
      .map((model) => model.modelId ?? model.id ?? "")
      .filter(Boolean);

    return modelNames;
  } catch {
    return [];
  }
}
