import Image from "next/image";
import { useWatch } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "~/components/ui/form";
import { Item, ItemContent, ItemTitle } from "~/components/ui/item";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { useAiFlawFormContext } from "~/entities/ai-flaw-report/model/hooks/useAiFlawFormContext";
import {
  SUBSTRATE_RELATIONSHIP_FIELD,
  INCIDENT_LOCATION_FIELD,
  HARM_NARRATIVE_FIELD,
} from "~/entities/ai-flaw-report/model/form-data/security-details-fields-config";

export function RealWorldIncidentDetails() {
  const { control } = useAiFlawFormContext();

  const realWorldHarm = useWatch({
    control,
    name: "classifyReport.real_world_harm",
  });

  if (!realWorldHarm) {
    return null;
  }

  return (
    <Item variant="outline" className="form-item-card">
      <ItemContent className="space-y-8">
        <ItemTitle className="form-title flex items-baseline gap-4">
          <Image
            src={SUBSTRATE_RELATIONSHIP_FIELD.icon}
            alt=""
            width={26}
            height={26}
            aria-hidden="true"
          />
          {SUBSTRATE_RELATIONSHIP_FIELD.title}
        </ItemTitle>

        <FormField
          control={control}
          name="securityDetails.harmNarrative"
          render={({ field }) => (
            <FormItem className="form-item-field">
              <FormLabel className="form-label">
                {HARM_NARRATIVE_FIELD.label}{" "}
                <span className="text-error-600">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder={HARM_NARRATIVE_FIELD.placeholder}
                  rows={HARM_NARRATIVE_FIELD.rows}
                  maxLength={HARM_NARRATIVE_FIELD.maxLength}
                  className="text-md min-h-[141px] w-full resize-none pr-10 dark:bg-white dark:text-gray-800"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={control}
            name="securityDetails.incidentLocation"
            render={({ field }) => (
              <FormItem className="form-item-field">
                <FormLabel className="form-label">
                  {INCIDENT_LOCATION_FIELD.label}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={INCIDENT_LOCATION_FIELD.placeholder}
                    className="text-md w-full dark:bg-white dark:text-gray-800"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="securityDetails.substrateRelationship"
            render={({ field }) => (
              <FormItem className="form-item-field">
                <FormLabel className="form-label">
                  {SUBSTRATE_RELATIONSHIP_FIELD.label}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={SUBSTRATE_RELATIONSHIP_FIELD.placeholder}
                    className="text-md w-full dark:bg-white dark:text-gray-800"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </ItemContent>
    </Item>
  );
}
