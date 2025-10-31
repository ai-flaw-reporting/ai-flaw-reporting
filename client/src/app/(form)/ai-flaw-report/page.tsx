import { MultiStepAiFlawReportForm } from "~/features/ai-flaw-report";
import { fetchHuggingFaceModels } from "~/app/actions/huggingface";

export default async function AiFlawReportPage() {
  const hfModels = await fetchHuggingFaceModels();

  return (
    <main className="flex-1 bg-gray-100 dark:bg-gray-900">
      <MultiStepAiFlawReportForm huggingFaceModels={hfModels} />
    </main>
  );
}
