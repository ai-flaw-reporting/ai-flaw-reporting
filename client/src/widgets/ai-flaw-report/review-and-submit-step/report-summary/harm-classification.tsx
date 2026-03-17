import { Badge } from "~/components/ui/badge";
import { useAiFlawFormContext } from "~/entities/ai-flaw-report/model/hooks/useAiFlawFormContext";
import { HARM_OPTION_VALUE } from "~/entities/ai-flaw-report/model/form-data/impact-assessment-fields-config";

export default function HarmClassification() {
  const { getValues } = useAiFlawFormContext();

  const harmType = getValues("impactAssessment.harmType");
  const documentedHarmCwe = getValues("impactAssessment.documentedHarmCwe");
  const harmOtherText = getValues("impactAssessment.harmOtherText");

  if (harmType === HARM_OPTION_VALUE.DOCUMENTED && documentedHarmCwe) {
    return (
      <Badge variant="outline" className="badge">
        {documentedHarmCwe}
      </Badge>
    );
  }

  if (harmType === HARM_OPTION_VALUE.NEW && harmOtherText) {
    return (
      <Badge variant="outline" className="badge">
        New Harm: {harmOtherText}
      </Badge>
    );
  }

  if (harmType === HARM_OPTION_VALUE.NEW) {
    return (
      <Badge variant="outline" className="badge">
        New Harm
      </Badge>
    );
  }

  return <span className="text-sm text-gray-600">—</span>;
}
