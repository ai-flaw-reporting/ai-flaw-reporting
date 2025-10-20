import { useWatch } from "react-hook-form";

import {
  SAVE_STATUS_COLORS,
  SAVE_STATUS_TEXT,
  useAiFlawFormContext,
  useFormStep,
} from "~/entities/ai-flaw-report";

import { cn } from "~/lib/utils";

export function SaveStatus() {
  const { control } = useAiFlawFormContext();
  const currentStep = useWatch({ control, name: "step" });
  const { saveStatus } = useFormStep(currentStep);

  const indicatorColor = SAVE_STATUS_COLORS[saveStatus];
  const statusText = SAVE_STATUS_TEXT[saveStatus];

  return (
    <p
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="text-md font-medium text-gray-500"
    >
      <span
        aria-hidden="true"
        className={cn(
          "mr-2 inline-block h-3.5 w-3.5 rounded-full",
          indicatorColor,
        )}
      />
      <span>{statusText}</span>
    </p>
  );
}
