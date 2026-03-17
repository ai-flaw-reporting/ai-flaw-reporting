"use client";

import Image from "next/image";
import { useWatch } from "react-hook-form";

import { useAiFlawFormContext } from "~/entities/ai-flaw-report/model/hooks/useAiFlawFormContext";

import { CsamWarning as CsamWarningComponent } from "../csam-warning";

export function CsamWarning() {
  const { control } = useAiFlawFormContext();

  const csamInvolved = useWatch({
    control,
    name: "classifyReport.csam_involved",
  });

  return (
    <>
      {csamInvolved && <CsamWarningComponent />}
      <div className="flex items-center justify-center gap-2">
        <Image
          src="/icons/warning-triangle.svg"
          alt=""
          width={22}
          height={20}
          className="shrink-0"
          aria-hidden="true"
        />
        <p className="text-sm font-medium text-gray-500">
          Please do not include sensitive information, especially CSAM or
          personal data
        </p>
      </div>
    </>
  );
}
