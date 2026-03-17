import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { Info, CheckCircle2 } from "lucide-react";
import { useAiFlawFormContext } from "~/entities/ai-flaw-report/model/hooks/useAiFlawFormContext";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  organizations: string[];
  onConfirm: () => void;
};

export function SubmissionConfirmationModal({
  open,
  onOpenChange,
  organizations,
  onConfirm,
}: Props) {
  const { getValues } = useAiFlawFormContext();
  const email = getValues("reporterDetails.reporter.email");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Confirm Submission</DialogTitle>
          <DialogDescription>
            Your report will be submitted to the following{" "}
            {organizations.length === 1 ? "organization" : "organizations"}:
          </DialogDescription>
        </DialogHeader>

        <ul className="flex flex-wrap gap-2 pb-1">
          {organizations.map((org) => (
            <li key={org}>
              <Badge variant="outline" className="badge">
                {org}
              </Badge>
            </li>
          ))}
        </ul>

        <div className="text-grey-800 border-grey-200 flex items-start gap-2 rounded-md border p-3 text-sm">
          <Info className="mt-0.5 size-4 shrink-0" />
          <p>
            Reports will be sent automatically and a copy will be sent to{" "}
            <span className="font-medium">{email}</span> for your records.
          </p>
        </div>

        <DialogFooter className="gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="cursor-pointer dark:border-gray-500 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={onConfirm}
            className="cursor-pointer bg-indigo-600 text-white hover:bg-indigo-700"
          >
            <CheckCircle2 className="mr-1 size-4" />
            Submit to {organizations.length}{" "}
            {organizations.length === 1 ? "Organization" : "Organizations"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
