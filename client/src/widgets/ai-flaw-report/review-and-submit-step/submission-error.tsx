"use client";

import { useSubmission } from "~/features/ai-flaw-report/multi-step-form/submission-context";
import { Item, ItemContent } from "~/components/ui/item";

export function SubmissionError() {
  const { submitError } = useSubmission();

  if (!submitError) {
    return null;
  }

  return (
    <Item variant="outline" className="form-item-card border-error-600">
      <ItemContent className="space-y-2">
        <p className="text-error-600 text-sm font-semibold">Submission Error</p>
        <p className="text-error-600 text-sm">{submitError}</p>
      </ItemContent>
    </Item>
  );
}
