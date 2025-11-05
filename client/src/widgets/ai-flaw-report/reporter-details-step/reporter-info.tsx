import Image from "next/image";

import { useAiFlawFormContext } from "~/entities/ai-flaw-report/model/hooks/useAiFlawFormContext";
import { REPORTER_FIELDS } from "~/entities/ai-flaw-report/model/form-data/reporter-fields-config";
import { REPORTER_ROW_FIELDS } from "~/entities/ai-flaw-report/model/form-data/reporter-fields-config";

import { Item, ItemContent, ItemTitle } from "~/components/ui/item";

import { FormFieldRenderer } from "~/components/form-field-renderer";

export function ReporterInfo() {
  const { control } = useAiFlawFormContext();

  return (
    <Item variant="outline" className="form-item-card">
      <ItemContent className="space-y-8">
        <ItemTitle className="form-title flex items-baseline gap-4">
          <Image
            src="/icons/form/building.svg"
            alt=""
            aria-hidden="true"
            width={27}
            height={27}
          />
          Reporter Information
        </ItemTitle>

        {REPORTER_FIELDS.map((fieldConfig) => (
          <FormFieldRenderer
            key={fieldConfig.name}
            name={fieldConfig.name}
            control={control}
            config={fieldConfig}
          />
        ))}

        <div className="flex gap-8">
          {REPORTER_ROW_FIELDS.map((fieldConfig) => (
            <FormFieldRenderer
              key={fieldConfig.name}
              name={fieldConfig.name}
              control={control}
              config={fieldConfig}
              className="form-item-select flex-1"
            />
          ))}
        </div>
      </ItemContent>
    </Item>
  );
}
