"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type SubmissionContextType = {
  submitError: string | null;
  setSubmitError: (error: string | null) => void;
  isSubmitSuccessful: boolean;
  setIsSubmitSuccessful: (success: boolean) => void;
};

const SubmissionContext = createContext<SubmissionContextType | undefined>(
  undefined,
);

export function SubmissionProvider({ children }: { children: ReactNode }) {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);

  return (
    <SubmissionContext.Provider
      value={{
        submitError,
        setSubmitError,
        isSubmitSuccessful,
        setIsSubmitSuccessful,
      }}
    >
      {children}
    </SubmissionContext.Provider>
  );
}

export function useSubmission() {
  const context = useContext(SubmissionContext);
  if (!context) {
    throw new Error("useSubmission must be used within SubmissionProvider");
  }
  return context;
}
