import { IntroductionContent } from "~/widgets/ai-flaw-report/introduction";

export default async function AiFlawReportPage() {
  return (
    <main className="flex-1 bg-gray-100 px-4 py-8 md:px-8 dark:bg-gray-900">
      <div className="mx-auto max-w-[1440px]">
        <IntroductionContent />
      </div>
    </main>
  );
}
