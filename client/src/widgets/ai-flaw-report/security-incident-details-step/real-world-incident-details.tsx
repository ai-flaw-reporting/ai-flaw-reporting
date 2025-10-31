import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { useWatch } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "~/components/ui/form";
import { Item, ItemContent, ItemTitle } from "~/components/ui/item";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Badge } from "~/components/ui/badge";
import { useAiFlawFormContext } from "~/entities/ai-flaw-report/model/hooks/useAiFlawFormContext";
import { SUBSTRATE_RELATIONSHIP_FIELD } from "~/entities/ai-flaw-report/model/form-data/security-details-fields-config";
import { INCIDENT_LOCATION_FIELD } from "~/entities/ai-flaw-report/model/form-data/security-details-fields-config";
import { HARM_NARRATIVE_FIELD } from "~/entities/ai-flaw-report/model/form-data/security-details-fields-config";
import { getSafeArray, createArrayRemoveHandler } from "~/lib/form-field-utils";

export function RealWorldIncidentDetails() {
  const { control } = useAiFlawFormContext();
  const [locationInput, setLocationInput] = useState("");

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
          name="securityDetails.substrateRelationship"
          render={({ field }) => (
            <FormItem className="form-item-field">
              <FormLabel className="form-label">
                {SUBSTRATE_RELATIONSHIP_FIELD.label}{" "}
                <span className="text-error-600">*</span>
              </FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="text-md w-full dark:bg-white dark:text-gray-800">
                    <SelectValue
                      placeholder={SUBSTRATE_RELATIONSHIP_FIELD.placeholder}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {SUBSTRATE_RELATIONSHIP_FIELD.options?.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription className="text-gray-600 dark:text-gray-100">
                {SUBSTRATE_RELATIONSHIP_FIELD.description}
              </FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="securityDetails.incidentLocation"
          render={({ field }) => {
            const locations = getSafeArray<string>(field.value);
            const removeLocation = createArrayRemoveHandler(
              field.value,
              field.onChange,
            );

            const addLocation = (e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === "Enter" && locationInput.trim()) {
                e.preventDefault();
                field.onChange([...locations, locationInput.trim()]);
                setLocationInput("");
              }
            };

            return (
              <FormItem className="form-item-field">
                <FormLabel className="form-label">
                  {INCIDENT_LOCATION_FIELD.label}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={INCIDENT_LOCATION_FIELD.placeholder}
                    value={locationInput}
                    onChange={(e) => setLocationInput(e.target.value)}
                    onKeyDown={addLocation}
                    className="text-md w-full dark:bg-white dark:text-gray-800"
                  />
                </FormControl>
                <FormDescription className="text-gray-600 dark:text-gray-100">
                  {INCIDENT_LOCATION_FIELD.description}
                </FormDescription>
                {!!locations.length && (
                  <div className="flex flex-wrap gap-2">
                    {locations.map((location) => (
                      <Badge
                        key={location}
                        variant="outline"
                        className="flex items-center gap-[3px] rounded-[6px] border-gray-300 py-[3px] pr-1 pl-2"
                      >
                        <span className="text-xs leading-4.5">{location}</span>
                        <button
                          type="button"
                          onClick={() => removeLocation(location)}
                          className="cursor-pointer p-0.5"
                          aria-label={`Remove ${location}`}
                        >
                          <X
                            className="h-2.5 w-2.5 text-gray-400"
                            aria-hidden="true"
                          />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </FormItem>
            );
          }}
        />

        <FormField
          control={control}
          name="securityDetails.harmNarrative"
          render={({ field }) => (
            <FormItem className="form-item-field">
              <FormLabel className="form-label">
                {HARM_NARRATIVE_FIELD.label}
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
      </ItemContent>
    </Item>
  );
}
