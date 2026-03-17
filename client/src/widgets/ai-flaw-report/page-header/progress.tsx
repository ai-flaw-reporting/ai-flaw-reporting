import { useWatch } from "react-hook-form";
import { Check } from "lucide-react";

import { useAiFlawFormContext } from "~/entities/ai-flaw-report/model/hooks/useAiFlawFormContext";
import { STEP_ORDER } from "~/entities/ai-flaw-report/model/step-config";
import { STEP_CONFIGS } from "~/entities/ai-flaw-report/model/step-config";
import { STEP_STATUS } from "~/entities/ai-flaw-report/model/constants";
import { BADGE_VARIANTS } from "~/entities/ai-flaw-report/model/constants";

import { Progress } from "~/components/ui/progress";
import { Badge } from "~/components/ui/badge";

import { cn } from "~/lib/utils";

const VISIBLE_STEPS = STEP_ORDER.filter((s) => s !== "SUBMISSION_SUCCESS");

export function ProgressComponent() {
  const { control } = useAiFlawFormContext();
  const currentStep = useWatch({ control, name: "step" });

  const isSuccessStep = currentStep === "SUBMISSION_SUCCESS";
  const currentStepIndex = isSuccessStep
    ? VISIBLE_STEPS.length
    : VISIBLE_STEPS.indexOf(currentStep);
  const totalSteps = VISIBLE_STEPS.length;
  const progressValue = isSuccessStep
    ? 100
    : ((currentStepIndex + 1) / totalSteps) * 100;

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
        {VISIBLE_STEPS.map((step, index) => {
          const stepConfig = STEP_CONFIGS[step];
          const isCompleted = isSuccessStep || index < currentStepIndex;
          const isCurrent = !isSuccessStep && step === currentStep;

          const stepStatus = isCurrent
            ? STEP_STATUS.CURRENT
            : isCompleted
              ? STEP_STATUS.COMPLETED
              : STEP_STATUS.UPCOMING;

          return (
            <li key={step} className="flex flex-col items-center gap-2.5">
              <Badge
                variant={BADGE_VARIANTS[stepStatus]}
                className={cn(
                  "h-8 w-8 rounded-full p-0 text-lg font-medium dark:text-gray-400",
                  isCurrent && "text-primary-foreground dark:text-white",
                  !isCurrent && !isCompleted && "dark:bg-transparent",
                )}
                aria-label={`Step ${index + 1}: ${stepConfig.badgeTitle} - ${stepStatus}`}
                aria-current={isCurrent ? "step" : undefined}
              >
                <span aria-hidden="true">
                  {isCurrent ? (
                    index + 1
                  ) : isCompleted ? (
                    <Check className="text-gray-25" />
                  ) : (
                    index + 1
                  )}
                </span>
              </Badge>
              <p
                className={cn(
                  "text-sm",
                  isCompleted
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
