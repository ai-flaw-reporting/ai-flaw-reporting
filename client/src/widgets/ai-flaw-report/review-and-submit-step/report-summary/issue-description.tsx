import { useAiFlawFormContext } from "~/entities/ai-flaw-report/model/hooks/useAiFlawFormContext";

export default function IssueDescription() {
  const { getValues } = useAiFlawFormContext();
  const description = getValues("incidentDescription.issueDescription");

  if (!description) return <span className="text-sm text-gray-600">—</span>;

  return (
    <p className="text-sm text-gray-700 dark:text-gray-200">
      {description}
    </p>
  );
}
