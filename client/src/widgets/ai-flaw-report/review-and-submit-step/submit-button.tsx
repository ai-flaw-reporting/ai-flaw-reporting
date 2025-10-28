import { Button } from "~/components/ui/button";
import { Send } from "lucide-react";
import { useSubmitReport } from "~/entities/ai-flaw-report/model/hooks/useSubmitReport";
import { ReportComplited } from "./report-complited";

export function SubmitButton() {
  const { isSubmitted, selectedStakeholders, isSubmitDisabled } =
    useSubmitReport();

  return (
    <>
      <Button
        type="submit"
        className="text-md border-gray-blue-600 min-h-11 w-full cursor-pointer bg-indigo-600 py-2.5 font-semibold text-white hover:bg-indigo-600 disabled:cursor-not-allowed disabled:bg-gray-300"
        disabled={isSubmitDisabled}
      >
        <Send className="size-5" /> Submit to{" "}
        {selectedStakeholders?.length ? selectedStakeholders?.length : ""}{" "}
        {selectedStakeholders?.length <= 1 ? "Organization" : "Organizations"}
      </Button>
      {isSubmitted && (
        <ReportComplited selectedStakeholders={selectedStakeholders} />
      )}
    </>
  );
}
