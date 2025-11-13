import { Button } from "~/components/ui/button";
import { Send, Loader2 } from "lucide-react";
import { useSubmitReport } from "~/entities/ai-flaw-report/model/hooks/useSubmitReport";
import { useSubmission } from "~/features/ai-flaw-report/multi-step-form/submission-context";
import { ReportComplited } from "./report-complited";

export function SubmitButton() {
  const { isSubmitting, selectedStakeholders, isSubmitDisabled } =
    useSubmitReport();
  const { submitError, isSubmitSuccessful } = useSubmission();

  // Only show success widget if submission actually succeeded (after API call completes)
  const showSuccess = isSubmitSuccessful && !submitError;

  return (
    <>
      <Button
        type="submit"
        className="text-md border-gray-blue-600 min-h-11 w-full cursor-pointer bg-indigo-600 py-2.5 font-semibold text-white hover:bg-indigo-600 disabled:cursor-not-allowed disabled:bg-gray-300"
        disabled={isSubmitDisabled || isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="size-5 animate-spin" /> Submitting...
          </>
        ) : (
          <>
            <Send className="size-5" /> Submit to{" "}
            {selectedStakeholders?.length ? selectedStakeholders?.length : ""}{" "}
            {selectedStakeholders?.length <= 1
              ? "Organization"
              : "Organizations"}
          </>
        )}
      </Button>
      {showSuccess && (
        <ReportComplited selectedStakeholders={selectedStakeholders} />
      )}
    </>
  );
}
