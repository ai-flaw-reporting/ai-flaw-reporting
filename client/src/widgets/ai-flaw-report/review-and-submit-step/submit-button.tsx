import { useState, useMemo, useCallback } from "react";
import { Button } from "~/components/ui/button";
import { Send, Loader2 } from "lucide-react";
import { useSubmitReport } from "~/entities/ai-flaw-report/model/hooks/useSubmitReport";
import { useSubmission } from "~/features/ai-flaw-report/multi-step-form/submission-context";
import { useStepsValidation } from "~/entities/ai-flaw-report/model/hooks/useStepsValidation";
import { SUBMIT_STAKEHOLDERS_CONFIG } from "~/entities/ai-flaw-report/model/form-data/review-and-submit-fields-config";
import { SubmissionConfirmationModal } from "./submission-confirmation-modal";
import { PublicDisclosureWarningModal } from "./public-disclosure-warning-modal";

export function SubmitButton() {
  const { isSubmitting, selectedStakeholders, isSubmitDisabled } =
    useSubmitReport();
  const { formRef } = useSubmission();
  const { incompleteSteps } = useStepsValidation();
  const hasIncompleteSections = incompleteSteps.length > 0;

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showPublicWarning, setShowPublicWarning] = useState(false);

  const publicOrgs = useMemo(() => {
    return SUBMIT_STAKEHOLDERS_CONFIG.stakeholders
      .filter(
        (s) => s.makesReportPublic && selectedStakeholders.includes(s.name),
      )
      .map((s) => ({ name: s.name, warning: s.publicWarning }));
  }, [selectedStakeholders]);

  const hasPublicOrgs = publicOrgs.length > 0;

  const requestFormSubmit = useCallback(() => {
    formRef.current?.requestSubmit();
  }, [formRef]);

  const handleSubmitClick = () => {
    setShowConfirmation(true);
  };

  const handleConfirmation = () => {
    setShowConfirmation(false);
    if (hasPublicOrgs) {
      setShowPublicWarning(true);
    } else {
      requestFormSubmit();
    }
  };

  const handleFinalSubmit = () => {
    setShowPublicWarning(false);
    requestFormSubmit();
  };

  return (
    <>
      <Button
        type="button"
        className="text-md border-gray-blue-600 min-h-11 w-full cursor-pointer bg-indigo-600 py-2.5 font-semibold text-white hover:bg-indigo-600 disabled:cursor-not-allowed disabled:bg-gray-300"
        disabled={isSubmitDisabled || isSubmitting || hasIncompleteSections}
        onClick={handleSubmitClick}
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

      <SubmissionConfirmationModal
        open={showConfirmation}
        onOpenChange={setShowConfirmation}
        organizations={selectedStakeholders}
        onConfirm={handleConfirmation}
      />

      <PublicDisclosureWarningModal
        open={showPublicWarning}
        onOpenChange={setShowPublicWarning}
        publicOrganizations={publicOrgs}
        onConfirm={handleFinalSubmit}
        isSubmitting={isSubmitting}
      />
    </>
  );
}
