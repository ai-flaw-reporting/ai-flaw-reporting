"use client";

import { AiSystemInfo } from "./ai-system-info";
import { ReporterInfo } from "./reporter-info";

export function ReporterDetailsStep() {
  return (
    <div className="space-y-4">
      <ReporterInfo />
      <AiSystemInfo />
    </div>
  );
}
