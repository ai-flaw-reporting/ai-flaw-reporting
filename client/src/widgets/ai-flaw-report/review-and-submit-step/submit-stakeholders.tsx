import { useEffect, useMemo } from "react";
import { useWatch } from "react-hook-form";
import { FormControl, FormField, FormItem } from "~/components/ui/form";
import { Item, ItemContent, ItemFooter, ItemTitle } from "~/components/ui/item";
import { CheckboxCard } from "~/components/ui/checkbox";
import { useAiFlawFormContext } from "~/entities/ai-flaw-report/model/hooks/useAiFlawFormContext";
import {
  safeIncludes,
  createArrayCheckboxHandler,
} from "~/lib/form-field-utils";
import Image from "next/image";
import { SUBMIT_STAKEHOLDERS_CONFIG } from "~/entities/ai-flaw-report/model/form-data/review-and-submit-fields-config";
import { mergeStakeholdersWithPlatforms } from "~/entities/ai-flaw-report/lib/get-stakeholders-from-platforms";
import { useHuggingFaceModels } from "~/features/ai-flaw-report/multi-step-form/models-context";
import { SubmitButton } from "./submit-button";

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

  // Filter stakeholders based on visibility conditions
  const visibleStakeholders = useMemo(() => {
    const formData = {
      platforms,
      models,
      realWorldHarm,
      huggingFaceModels,
    };

    return SUBMIT_STAKEHOLDERS_CONFIG.stakeholders.filter((stakeholder) => {
      // If no visibility condition is defined, default to visible
      if (!stakeholder.isVisible) {
        return true;
      }
      return stakeholder.isVisible(formData);
    });
  }, [platforms, models, realWorldHarm, huggingFaceModels]);

  // Auto-select stakeholders based on platforms and incident selection, and filter out invisible ones
  useEffect(() => {
    const systemEntries = getValues("reporterDetails.systems") ?? [];
    const selectedPlatforms = systemEntries.map((s) => s.platform);
    const currentStakeholders = getValues("reviewReport.selectedStakeholders");

    const mergedStakeholders = mergeStakeholdersWithPlatforms(
      selectedPlatforms,
      currentStakeholders,
    );

    // Auto-select AVID and AIID if incident is selected
    const stakeholdersToAdd: string[] = [];
    if (realWorldHarm === true) {
      stakeholdersToAdd.push("AVID", "AIID");
    }

    // Always auto-select "General AI Flaw Database"
    stakeholdersToAdd.push("General AI Flaw Database");

    const allStakeholders = Array.from(
      new Set([...mergedStakeholders, ...stakeholdersToAdd]),
    );

    // Filter out stakeholders that are no longer visible
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
            <span className="text-error-600">*</span>
          </span>
        </ItemTitle>
        <p className="text-sm font-normal text-gray-600 dark:text-gray-100">
          {SUBMIT_STAKEHOLDERS_CONFIG.description}
        </p>
        <p className="text-sm font-normal text-gray-600 dark:text-gray-100">
          This will submit your full report to these organizations, with your
          provided contact information, either via email or API. You will
          receive an email confirming the report was sent to each organization.
          Once the report is sent we cannot guarantee how each organization will
          process, triage, or review the reports. We recommend downloading your
          report (above) so you can continue to distribute it later if you need
          to.
        </p>
        <FormField
          control={control}
          name="reviewReport.selectedStakeholders"
          render={({ field }) => {
            const handleCheckboxChange = createArrayCheckboxHandler(
              field.value,
              field.onChange,
            );

            return (
              <FormItem className="form-item-field">
                <FormControl>
                  <ul className="space-y-1.5">
                    {visibleStakeholders.map((stakeholder) => {
                      const isSelectable = stakeholder.isSelectable !== false;
                      const isChecked = safeIncludes(
                        field.value,
                        stakeholder.name,
                      );

                      return (
                        <li key={stakeholder.name}>
                          <CheckboxCard
                            className="data-[state=checked]:border-indigo-600"
                            iconClassName="text-indigo-600"
                            checked={isChecked}
                            disabled={!isSelectable}
                            onCheckedChange={(checked) => {
                              if (isSelectable) {
                                handleCheckboxChange(
                                  checked as boolean,
                                  stakeholder.name,
                                );
                              }
                            }}
                          >
                            <div className="space-y-4">
                              <h3 className="text-md font-semibold text-gray-900">
                                {stakeholder.name}
                              </h3>
                              <p className="text-sm font-normal text-nowrap text-gray-600">
                                {stakeholder.description}
                              </p>
                            </div>
                          </CheckboxCard>
                        </li>
                      );
                    })}
                  </ul>
                </FormControl>
              </FormItem>
            );
          }}
        />
      </ItemContent>
      <ItemFooter className="flex flex-col gap-4">
        <SubmitButton />
      </ItemFooter>
    </Item>
  );
}
