import { useWatch } from "react-hook-form";

import { useAiFlawFormContext } from "~/entities/ai-flaw-report/model/hooks/useAiFlawFormContext";
import { STEP_CONFIGS } from "~/entities/ai-flaw-report/model/step-config";

export function FormHeader() {
  const { control } = useAiFlawFormContext();
  const step = useWatch({ control, name: "step" });

  if (!step || !STEP_CONFIGS[step]) {
    return <div>Loading...</div>;
  }

  return (
    <header aria-labelledby="form-title" className="space-y-4 text-center">
      <h2
        id="form-title"
        className="display-sm font-bold text-gray-800 dark:text-white"
      >
        {STEP_CONFIGS[step].title}
      </h2>
      <p
        className="text-sm font-normal text-gray-600 dark:text-gray-100"
        aria-describedby="form-title"
      >
        {STEP_CONFIGS[step].description}
      </p>
    </header>
  );
}
