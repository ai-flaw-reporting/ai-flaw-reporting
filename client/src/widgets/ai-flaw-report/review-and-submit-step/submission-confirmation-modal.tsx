"use client";

import { useState, useEffect } from "react";
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
import { Checkbox } from "~/components/ui/checkbox";
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
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    if (!open) setAgreed(false);
  }, [open]);

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

        <div className="space-y-3 text-xs text-red-600 dark:text-red-400 leading-relaxed">
          <p>
            By submitting, you confirm that: (1) you authored this report and
            lawfully obtained the information in it; (2) it contains no illegal
            material, malware, or confidential information you lack the right to
            share; and (3) you consent to its transmission to the organizations
            selected above and to the email shown.
          </p>
          <p>
            FLARE-AI is a routing tool. We do not verify, endorse, or adopt
            report contents; we do not guarantee delivery, response, or
            confidentiality; and use of this tool does not authorize testing of
            any system or provide legal safe harbor. Nothing here is legal
            advice.
          </p>
        </div>

        <label className="flex items-start gap-3 cursor-pointer">
          <Checkbox
            checked={agreed}
            onCheckedChange={(val) => setAgreed(!!val)}
            className="mt-0.5 shrink-0"
          />
          <span className="text-sm text-gray-700 dark:text-gray-300 leading-snug">
            I agree to the Terms of Use and Privacy Policy.
          </span>
        </label>

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
            disabled={!agreed}
            className="cursor-pointer bg-gray-900 text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-300"
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
