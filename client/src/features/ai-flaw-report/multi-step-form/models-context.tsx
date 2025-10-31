"use client";

import * as React from "react";

type HuggingFaceModelsContextValue = string[];

const HuggingFaceModelsContext = React.createContext<
  HuggingFaceModelsContextValue | undefined
>(undefined);

export function HuggingFaceModelsProvider({
  children,
  models,
}: React.PropsWithChildren<{ models: string[] }>) {
  return (
    <HuggingFaceModelsContext.Provider value={models}>
      {children}
    </HuggingFaceModelsContext.Provider>
  );
}

export function useHuggingFaceModels(): HuggingFaceModelsContextValue {
  const ctx = React.useContext(HuggingFaceModelsContext);
  if (!ctx) {
    throw new Error(
      "useHuggingFaceModels must be used within HuggingFaceModelsProvider",
    );
  }
  return ctx;
}
