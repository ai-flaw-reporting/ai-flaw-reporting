import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "~/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Badge } from "~/components/ui/badge";
import { X } from "lucide-react";
import { FieldTooltip } from "~/components/field-tooltip";
import Image from "next/image";
import {
  getSafeArray,
  createArraySelectHandler,
  createArrayRemoveHandler,
} from "~/lib/form-field-utils";
import { useAiFlawFormContext } from "~/entities/ai-flaw-report/model/hooks/useAiFlawFormContext";
import { AI_COMPANY_INVOLVED_FIELD } from "~/entities/ai-flaw-report/model/form-data/impact-assessment-fields-config";

export function AiCompanyInvolved() {
  const { control } = useAiFlawFormContext();

  return (
    <FormField
      control={control}
      name="impactAssessment.aiCompanyInvolved"
      render={({ field }) => {
        const values = getSafeArray<string>(field.value);
        const options = AI_COMPANY_INVOLVED_FIELD.options;
        const getLabel = (id: string) =>
          options.find((o) => o.id === id)?.label ?? id;

        const handleSelect = createArraySelectHandler(
          field.value,
          field.onChange,
        );
        const handleRemove = createArrayRemoveHandler(
          field.value,
          field.onChange,
        );

        return (
          <FormItem className="form-item-field">
            <FormLabel className="form-label">
              {AI_COMPANY_INVOLVED_FIELD.label}
            </FormLabel>
            <FormControl>
              <div className="space-y-1.5">
                <div className="relative">
                  <Select value="" onValueChange={handleSelect}>
                    <SelectTrigger className="text-md w-full pl-9 dark:bg-white dark:text-gray-800">
                      <Image
                        src="/icons/form/search.svg"
                        alt=""
                        width={16}
                        height={16}
                        className="absolute top-1/2 left-2 -translate-y-1/2"
                        aria-hidden="true"
                      />
                      <SelectValue
                        placeholder={AI_COMPANY_INVOLVED_FIELD.placeholder}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {options
                        .filter((o) => !values.includes(o.id))
                        .map((o) => (
                          <SelectItem key={o.id} value={o.id}>
                            {o.label}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <FieldTooltip
                    text="Select the AI companies involved in this incident"
                    ariaLabel="AI Company involved help"
                    className="right-13"
                  />
                </div>

                {values.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {values.map((v: string) => (
                      <Badge
                        key={v}
                        variant="outline"
                        className="flex items-center gap-[3px] rounded-[6px] border-gray-300 py-[3px] pr-1 pl-2"
                      >
                        <span className="text-xs leading-4.5">
                          {getLabel(v)}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemove(v)}
                          className="cursor-pointer p-0.5"
                          aria-label={`Remove ${getLabel(v)}`}
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
              </div>
            </FormControl>
          </FormItem>
        );
      }}
    />
  );
}
