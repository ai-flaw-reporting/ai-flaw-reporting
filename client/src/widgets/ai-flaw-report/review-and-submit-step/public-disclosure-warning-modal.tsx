import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { AlertTriangle, Info, Check, Loader2 } from "lucide-react";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  publicOrganizations: { name: string; warning?: string }[];
  onConfirm: () => void;
  isSubmitting: boolean;
};

export function PublicDisclosureWarningModal({
  open,
  onOpenChange,
  publicOrganizations,
  onConfirm,
  isSubmitting,
}: Props) {
  const [acknowledged, setAcknowledged] = useState(false);

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) setAcknowledged(false);
    onOpenChange(nextOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-left">
          <DialogTitle className="flex items-center gap-2 text-warning-600 dark:text-warning-500">
            <AlertTriangle className="size-5" />
            Public Disclosure
          </DialogTitle>
        </DialogHeader>

        <p className="text-sm text-gray-600 dark:text-gray-300">
          You have selected organizations that will make your report publicly
          visible:
        </p>

        <div className="space-y-3">
          {publicOrganizations.map((org) => (
            <div key={org.name} className="flex items-start gap-2">
              <Info className="mt-0.5 size-5 shrink-0 text-warning-500 dark:text-warning-400" />
              <p className="text-sm text-gray-700 dark:text-gray-200">
                <span className="font-semibold">{org.name}:</span> {org.warning}
              </p>
            </div>
          ))}
        </div>

        <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-gray-200 p-3 dark:border-gray-500">
          <Checkbox
            checked={acknowledged}
            onCheckedChange={(c) => setAcknowledged(c === true)}
            className="mt-0.5"
          />
          <span className="text-sm text-gray-700 dark:text-gray-200">
            I understand that by submitting to these organizations, my report
            will become publicly accessible according to their policies.
          </span>
        </label>

        <DialogFooter className="gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => handleOpenChange(false)}
            className="cursor-pointer dark:border-gray-500 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
            disabled={isSubmitting}
          >
            Go back
          </Button>
          <Button
            type="button"
            onClick={onConfirm}
            disabled={!acknowledged || isSubmitting}
            className="cursor-pointer bg-gray-900 text-white hover:bg-gray-800"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-1 size-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Check className="mr-1 size-4" />
                Submit Report
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
