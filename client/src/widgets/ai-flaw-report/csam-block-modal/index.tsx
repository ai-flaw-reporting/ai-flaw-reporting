"use client";

import { useEffect, useRef, useState } from "react";
import { useWatch } from "react-hook-form";
import { AlertTriangle } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { useAiFlawFormContext } from "~/entities/ai-flaw-report/model/hooks/useAiFlawFormContext";

export function CsamBlockModal() {
  const { control } = useAiFlawFormContext();

  const csamInvolved = useWatch({
    control,
    name: "classifyReport.csam_involved",
  });

  const [open, setOpen] = useState(false);
  const prevCsamInvolvedRef = useRef<boolean | undefined>(csamInvolved);

  useEffect(() => {
    const prev = prevCsamInvolvedRef.current;
    if (csamInvolved && !prev) {
      setOpen(true);
    } else if (!csamInvolved && open) {
      setOpen(false);
    }
    prevCsamInvolvedRef.current = csamInvolved;
  }, [csamInvolved, open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md" showCloseButton={false}>
        <DialogHeader className="text-left">
          <DialogTitle className="text-error-600 dark:text-error-500 flex items-center gap-2">
            <AlertTriangle className="size-5" />
            FLARE-AI cannot be used to report CSAM
          </DialogTitle>
        </DialogHeader>

        <DialogFooter>
          <Button
            type="button"
            onClick={() => setOpen(false)}
            className="cursor-pointer bg-gray-900 text-white hover:bg-gray-800"
          >
            OK
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
