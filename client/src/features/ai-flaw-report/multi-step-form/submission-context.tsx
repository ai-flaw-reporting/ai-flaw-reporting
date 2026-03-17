"use client";

import {
  createContext,
  useContext,
  useState,
  useRef,
  type ReactNode,
  type RefObject,
} from "react";

type SubmissionContextType = {
  submitError: string | null;
  setSubmitError: (error: string | null) => void;
  isSubmitSuccessful: boolean;
  setIsSubmitSuccessful: (success: boolean) => void;
  reportId: string | null;
  setReportId: (id: string | null) => void;
  submittedOrganizations: string[];
  setSubmittedOrganizations: (orgs: string[]) => void;
  formRef: RefObject<HTMLFormElement | null>;
};

const SubmissionContext = createContext<SubmissionContextType | undefined>(
  undefined,
);

export function SubmissionProvider({ children }: { children: ReactNode }) {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);
  const [reportId, setReportId] = useState<string | null>(null);
  const [submittedOrganizations, setSubmittedOrganizations] = useState<
    string[]
  >([]);
  const formRef = useRef<HTMLFormElement | null>(null);

  return (
    <SubmissionContext.Provider
      value={{
        submitError,
        setSubmitError,
        isSubmitSuccessful,
        setIsSubmitSuccessful,
        reportId,
        setReportId,
        submittedOrganizations,
        setSubmittedOrganizations,
        formRef,
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
