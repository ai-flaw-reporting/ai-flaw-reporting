import { useEffect, useRef, useMemo } from "react";
import { useWatch } from "react-hook-form";
import { FileText, Sparkles, ExternalLink } from "lucide-react";

import { useAiFlawFormContext } from "~/entities/ai-flaw-report/model/hooks/useAiFlawFormContext";
import {
  HARM_TYPE_FIELD,
  HARM_OPTION_VALUE,
  DOCUMENTED_HARM_CWE_FIELD,
} from "~/entities/ai-flaw-report/model/form-data/impact-assessment-fields-config";

import { truncateText } from "~/lib/utils";
import { FormControl, FormField, FormItem } from "~/components/ui/form";
import { Item, ItemContent, ItemTitle } from "~/components/ui/item";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { FieldTooltip } from "~/components/field-tooltip";

const MITRE_CWE_URL = "https://cwe.mitre.org/documents/schema/index.html";

const CARD_ICONS = {
  [HARM_OPTION_VALUE.DOCUMENTED]: FileText,
  [HARM_OPTION_VALUE.NEW]: Sparkles,
} as const;

export function HarmType() {
  const { control, setValue } = useAiFlawFormContext();

  const harmType = useWatch({
    control,
    name: "impactAssessment.harmType",
  });

  const documentedHarmCwe = useWatch({
    control,
    name: "impactAssessment.documentedHarmCwe",
  });

  const previousHarmTypeRef = useRef<string | undefined>(undefined);

  const isDocumentedHarm = harmType === HARM_OPTION_VALUE.DOCUMENTED;

  const truncatedSelectedText = useMemo(() => {
    const selectedOption = DOCUMENTED_HARM_CWE_FIELD.options.find(
      (option) => option.value === documentedHarmCwe,
    );
    return selectedOption
      ? truncateText(
          `${selectedOption.label} ${selectedOption.description}`,
          30,
        )
      : null;
  }, [documentedHarmCwe]);

  useEffect(() => {
    if (
      previousHarmTypeRef.current &&
      previousHarmTypeRef.current !== harmType
    ) {
      setValue("impactAssessment.documentedHarmCwe", "");
    }
    previousHarmTypeRef.current = harmType;
  }, [harmType, setValue]);

  return (
    <Item variant="outline" className="form-item-card">
      <ItemContent className="space-y-8">
        <div className="space-y-2">
          <ItemTitle className="form-title flex items-baseline">
            <span>{HARM_TYPE_FIELD.title}</span>
          </ItemTitle>
          <p className="text-md text-gray-500">{HARM_TYPE_FIELD.label}</p>
        </div>
        <FormField
          control={control}
          name="impactAssessment.harmType"
          render={({ field }) => (
            <FormItem className="form-item-field">
              <FormControl>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {HARM_TYPE_FIELD.options.map((option) => {
                    const isSelected = field.value === option.value;
                    const Icon = CARD_ICONS[option.value];

                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => field.onChange(option.value)}
                        className={`flex items-start gap-4 rounded-xl border-2 p-6 text-left transition-colors ${
                          isSelected
                            ? "border-blue-400 bg-blue-50"
                            : "border-gray-200 bg-white hover:border-gray-300"
                        }`}
                      >
                        <div
                          className={`shrink-0 rounded-lg p-3 ${
                            isSelected ? "bg-blue-100" : "bg-slate-100"
                          }`}
                        >
                          <Icon className="size-6 text-gray-700" />
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="text-lg font-semibold text-gray-800">
                            {option.label}
                          </span>
                          <span className="text-sm text-gray-500">
                            {option.description}
                            <a
                              href={MITRE_CWE_URL}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-blue-500 hover:text-blue-600"
                              onClick={(e) => e.stopPropagation()}
                            >
                              MITRE CWE
                              <ExternalLink className="size-3" />
                            </a>
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </FormControl>
            </FormItem>
          )}
        />
        {isDocumentedHarm && (
          <FormField
            control={control}
            name="impactAssessment.documentedHarmCwe"
            render={({ field }) => (
              <FormItem className="form-item-field">
                <FormControl>
                  <div className="relative max-w-[353px]">
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="text-md w-full dark:bg-white dark:text-gray-800">
                        <SelectValue
                          placeholder={DOCUMENTED_HARM_CWE_FIELD.placeholder}
                        >
                          {truncatedSelectedText}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {DOCUMENTED_HARM_CWE_FIELD.options.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label} {option.description}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FieldTooltip
                      text=""
                      ariaLabel="Documented Weakness CWE help"
                      className="right-13"
                    />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        )}
      </ItemContent>
    </Item>
  );
}
