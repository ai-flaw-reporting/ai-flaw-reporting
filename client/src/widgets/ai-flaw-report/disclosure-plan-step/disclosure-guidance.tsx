import { useWatch } from "react-hook-form";

import { useAiFlawFormContext } from "~/entities/ai-flaw-report/model/hooks/useAiFlawFormContext";
import {
  DISCLOSURE_GUIDANCE_FIELD,
  PUBLIC_DISCLOSURE_INTENT_VALUES,
} from "~/entities/ai-flaw-report/model/form-data/disclosure-plan-fields-config";

import { Item, ItemContent, ItemTitle } from "~/components/ui/item";

export function DisclosureGuidance() {
  const { control } = useAiFlawFormContext();

  const publicDisclosureIntent = useWatch({
    control,
    name: "disclosurePlan.publicDisclosureIntent",
  });

  if (publicDisclosureIntent !== PUBLIC_DISCLOSURE_INTENT_VALUES.UNDECIDED) {
    return null;
  }

  return (
    <Item variant="outline" className="form-item-card">
      <ItemContent className="space-y-4">
        <ItemTitle className="form-title">
          {DISCLOSURE_GUIDANCE_FIELD.title}
        </ItemTitle>
        <div className="space-y-2">
          <p className="form-label">{DISCLOSURE_GUIDANCE_FIELD.label}</p>
          <ul className="form-label list-inside list-disc pl-3.5">
            {DISCLOSURE_GUIDANCE_FIELD.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="form-label">{DISCLOSURE_GUIDANCE_FIELD.description}</p>
        </div>
      </ItemContent>
    </Item>
  );
}
