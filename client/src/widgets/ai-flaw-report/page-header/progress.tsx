import { useWatch } from "react-hook-form";
import { Check } from "lucide-react";

import {
  STEP_ORDER,
  STEP_CONFIGS,
  STEP_STATUS,
  BADGE_VARIANTS,
  useAiFlawFormContext,
} from "~/entities/ai-flaw-report";

import { Progress } from "~/components/ui/progress";
import { Badge } from "~/components/ui/badge";

import { cn } from "~/lib/utils";

export function ProgressComponent() {
  const { control } = useAiFlawFormContext();
  const currentStep = useWatch({ control, name: "step" });

  const currentStepIndex = STEP_ORDER.indexOf(currentStep);
  const totalSteps = STEP_ORDER.length;
  const progressValue = ((currentStepIndex + 1) / totalSteps) * 100;

  return (
    <div role="region" aria-label="Form progress" className="space-y-7">
      <Progress
        value={progressValue}
        className="h-2.5 bg-gray-200"
        aria-hidden="true"
      />
      <ol
        className="flex flex-wrap justify-center gap-19.5"
        aria-label="Form steps"
      >
        {STEP_ORDER.map((step, index) => {
          const stepConfig = STEP_CONFIGS[step];
          const isSuccess = index < currentStepIndex;
          const isCurrent = step === currentStep;

          const stepStatus = isCurrent
            ? STEP_STATUS.CURRENT
            : isSuccess
              ? STEP_STATUS.COMPLETED
              : STEP_STATUS.UPCOMING;

          return (
            <li key={step} className="flex flex-col items-center gap-2.5">
              <Badge
                variant={BADGE_VARIANTS[stepStatus]}
                className={cn(
                  "h-8 w-8 rounded-full p-0 text-lg font-medium",
                  isCurrent && "text-primary-foreground",
                  !isCurrent && !isSuccess && "dark:bg-transparent",
                )}
                aria-label={`Step ${index + 1}: ${stepConfig.badgeTitle} - ${stepStatus}`}
                aria-current={isCurrent ? "step" : undefined}
              >
                <span aria-hidden="true">
                  {isCurrent ? index + 1 : isSuccess ? <Check /> : index + 1}
                </span>
              </Badge>
              <p
                className={cn(
                  "text-sm",
                  isSuccess
                    ? "text-success-600 font-bold"
                    : isCurrent
                      ? "font-bold text-indigo-500"
                      : "font-medium text-gray-400",
                )}
                aria-hidden="true"
              >
                {stepConfig.badgeTitle}
              </p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
