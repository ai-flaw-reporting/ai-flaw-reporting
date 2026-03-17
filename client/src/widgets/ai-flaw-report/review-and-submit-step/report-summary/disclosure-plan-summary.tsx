import { Badge } from "~/components/ui/badge";
import { useAiFlawFormContext } from "~/entities/ai-flaw-report/model/hooks/useAiFlawFormContext";

const DISCLOSURE_LABELS: Record<string, string> = {
  yes: "Public",
  no: "Private",
  already: "Already Public",
  undecided: "Undecided",
};

export default function DisclosurePlanSummary() {
  const { getValues } = useAiFlawFormContext();
  const intent = getValues("disclosurePlan.publicDisclosureIntent");

  const label = intent ? DISCLOSURE_LABELS[intent] ?? intent : null;

  if (!label) return <span className="text-sm text-gray-600">—</span>;

  return (
    <Badge variant="outline" className="badge">
      {label}
    </Badge>
  );
}
