import { useEffect, useMemo } from "react";
import { useWatch } from "react-hook-form";
import { FormControl, FormField, FormItem } from "~/components/ui/form";
import { Item, ItemContent, ItemFooter, ItemTitle } from "~/components/ui/item";
import { Switch } from "~/components/ui/switch";
import { Badge } from "~/components/ui/badge";
import { useAiFlawFormContext } from "~/entities/ai-flaw-report/model/hooks/useAiFlawFormContext";
import { safeIncludes } from "~/lib/form-field-utils";
import Image from "next/image";
import {
  SUBMIT_STAKEHOLDERS_CONFIG,
  type StakeholderConfig,
} from "~/entities/ai-flaw-report/model/form-data/review-and-submit-fields-config";
import { mergeStakeholdersWithPlatforms } from "~/entities/ai-flaw-report/lib/get-stakeholders-from-platforms";
import { useHuggingFaceModels } from "~/features/ai-flaw-report/multi-step-form/models-context";
import { SubmitButton } from "./submit-button";
import { AlertTriangle, ExternalLink } from "lucide-react";

export function SubmitStakeholders() {
  const { control, getValues, setValue } = useAiFlawFormContext();
  const huggingFaceModels = useHuggingFaceModels();

  const systems = useWatch({
    control,
    name: "reporterDetails.systems",
  });

  const platforms = systems?.map((s) => s.platform) ?? [];
  const models =
    systems
      ?.map((s) => s.model)
      .filter((m) => m !== "I'm not sure") ?? [];

  const realWorldHarm = useWatch({
    control,
    name: "classifyReport.real_world_harm",
  });

  const visibleStakeholders = useMemo(() => {
    const formData = {
      platforms,
      models,
      realWorldHarm,
      huggingFaceModels,
    };

    return SUBMIT_STAKEHOLDERS_CONFIG.stakeholders.filter((stakeholder) => {
      if (!stakeholder.isVisible) return true;
      return stakeholder.isVisible(formData);
    });
  }, [platforms, models, realWorldHarm, huggingFaceModels]);

  useEffect(() => {
    const systemEntries = getValues("reporterDetails.systems") ?? [];
    const selectedPlatforms = systemEntries.map((s) => s.platform);
    const currentStakeholders = getValues("reviewReport.selectedStakeholders");

    const mergedStakeholders = mergeStakeholdersWithPlatforms(
      selectedPlatforms,
      currentStakeholders,
    );

    const stakeholdersToAdd: string[] = [];
    if (realWorldHarm === true) {
      stakeholdersToAdd.push("AVID", "AIID");
    }
    stakeholdersToAdd.push("General AI Flaw Database");

    const allStakeholders = Array.from(
      new Set([...mergedStakeholders, ...stakeholdersToAdd]),
    );

    const formData = {
      platforms,
      models,
      realWorldHarm,
      huggingFaceModels,
    };

    const visibleStakeholderNames = new Set(
      SUBMIT_STAKEHOLDERS_CONFIG.stakeholders
        .filter((stakeholder) => {
          if (!stakeholder.isVisible) return true;
          return stakeholder.isVisible(formData);
        })
        .map((s) => s.name),
    );

    const filteredStakeholders = allStakeholders.filter((name) =>
      visibleStakeholderNames.has(name),
    );

    setValue("reviewReport.selectedStakeholders", filteredStakeholders, {
      shouldValidate: false,
    });
  }, [
    platforms,
    models,
    realWorldHarm,
    huggingFaceModels,
    getValues,
    setValue,
  ]);

  return (
    <Item variant="outline" className="form-item-card">
      <ItemContent className="gap-4">
        <ItemTitle className="form-title flex items-baseline gap-4">
          <Image
            src={SUBMIT_STAKEHOLDERS_CONFIG.icon}
            alt=""
            width={24}
            height={24}
            aria-hidden="true"
          />
          <span>
            {SUBMIT_STAKEHOLDERS_CONFIG.title}{" "}
            <span className="text-error-600 dark:text-error-400">*</span>
          </span>
        </ItemTitle>
        <p className="text-sm font-normal text-gray-600 dark:text-gray-100">
          {SUBMIT_STAKEHOLDERS_CONFIG.description}
        </p>
        <FormField
          control={control}
          name="reviewReport.selectedStakeholders"
          render={({ field }) => (
            <FormItem className="form-item-field">
              <FormControl>
                <ul className="space-y-1.5">
                  {visibleStakeholders.map((stakeholder) => (
                    <StakeholderRow
                      key={stakeholder.name}
                      stakeholder={stakeholder}
                      checked={safeIncludes(field.value, stakeholder.name)}
                      onToggle={(checked) => {
                        if (stakeholder.isSelectable === false) return;
                        const current = field.value ?? [];
                        const next = checked
                          ? [...current, stakeholder.name]
                          : current.filter(
                              (s: string) => s !== stakeholder.name,
                            );
                        field.onChange(next);
                      }}
                    />
                  ))}
                </ul>
              </FormControl>
            </FormItem>
          )}
        />
      </ItemContent>
      <ItemFooter className="flex flex-col gap-4">
        <SubmitButton />
      </ItemFooter>
    </Item>
  );
}

function StakeholderRow({
  stakeholder,
  checked,
  onToggle,
}: {
  stakeholder: StakeholderConfig;
  checked: boolean;
  onToggle: (checked: boolean) => void;
}) {
  const isSelectable = stakeholder.isSelectable !== false;

  return (
    <li
      className={`flex items-center gap-4 rounded-lg border px-4 py-3 transition-colors ${
        checked
          ? "border-indigo-600 bg-indigo-50 dark:border-indigo-500 dark:bg-indigo-950"
          : "border-gray-200 bg-white dark:border-gray-600 dark:bg-gray-800"
      } ${!isSelectable ? "opacity-60" : ""}`}
    >
      <Switch
        checked={checked}
        onCheckedChange={onToggle}
        disabled={!isSelectable}
        aria-label={`Toggle ${stakeholder.name}`}
      />

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            {stakeholder.name}
          </span>
          {stakeholder.makesReportPublic && (
            <Badge
              variant="outline"
              className="border-error-300 bg-error-50 text-error-700 dark:border-error-800 dark:bg-error-950 dark:text-error-300 flex items-center gap-1 text-xs font-medium"
            >
              <AlertTriangle className="size-3" />
              Makes Report Public
            </Badge>
          )}
        </div>
        <span className="text-sm text-gray-500 dark:text-gray-400">{stakeholder.description}</span>
        {stakeholder.makesReportPublic &&
          stakeholder.publicWarning &&
          checked && (
            <p className="text-error-600 dark:text-error-400 text-xs font-medium">
              {stakeholder.publicWarning}
            </p>
          )}
      </div>

      {stakeholder.policyUrl && (
        <a
          href={stakeholder.policyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 text-gray-400 transition-colors hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
          aria-label={`${stakeholder.name} reporting policy`}
        >
          <ExternalLink className="size-4" />
        </a>
      )}
    </li>
  );
}
