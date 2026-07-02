"use client";

import { useCallback, useMemo } from "react";
import Image from "next/image";
import { Plus, X } from "lucide-react";
import {
  type Control,
  useForm,
  useFormContext,
  useWatch,
} from "react-hook-form";

import { useAiFlawFormContext } from "~/entities/ai-flaw-report/model/hooks/useAiFlawFormContext";
import {
  AI_PLATFORMS,
  PLATFORM_CONFIGS,
  ACCESS_METHODS,
} from "~/entities/ai-flaw-report/model/form-data/reporter-details-data";
import type {
  AiFlawReportSchema,
  AiSystemConfig,
} from "~/entities/ai-flaw-report/model/types";
import { useHuggingFaceModels } from "~/features/ai-flaw-report/multi-step-form/models-context";

import { Item, ItemContent } from "~/components/ui/item";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Form,
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

const NOT_SURE_OPTION = "I'm not sure";
const OTHER_PLATFORM_LABEL = "Other";
const MAX_SYSTEMS = 10;

function getModelsForPlatform(
  platformLabel: string,
  huggingFaceModels: string[],
): string[] {
  const config = PLATFORM_CONFIGS.find((p) => p.label === platformLabel);
  const platformModels = config?.models ?? [];

  if (platformLabel === "Hugging Face") {
    return [...platformModels, ...huggingFaceModels];
  }

  return platformModels;
}

function formatChipLabel(system: AiSystemConfig): string {
  const parts = [system.platform, system.model];
  if (system.accessMethod) parts.push(system.accessMethod);
  if (system.version) parts.push(system.version);
  return parts.join(" \u2192 ");
}

type DraftState = {
  platform: string;
  model: string;
  accessMethod: string;
  version: string;
  platformOther: string;
  modelOther: string;
};

const EMPTY_DRAFT: DraftState = {
  platform: "",
  model: "",
  accessMethod: "",
  version: "",
  platformOther: "",
  modelOther: "",
};

function DraftModelField() {
  const { control } = useFormContext<DraftState>();
  const huggingFaceModels = useHuggingFaceModels();
  const platform = useWatch({ control, name: "platform" });

  const modelOptions = useMemo(() => {
    if (!platform) return [];
    return [
      NOT_SURE_OPTION,
      ...getModelsForPlatform(platform, huggingFaceModels),
    ];
  }, [platform, huggingFaceModels]);

  return (
    <FormField
      control={control}
      name="model"
      render={({ field }) => (
        <FormItem className="form-item-field">
          <FormLabel className="form-label text-sm font-medium text-gray-800 dark:text-white">
            AI System/Model <span className="text-error-600">*</span>
          </FormLabel>
          <Select
            value={field.value}
            onValueChange={field.onChange}
            disabled={!platform}
          >
            <FormControl>
              <SelectTrigger className="w-full dark:bg-white dark:text-gray-800">
                <SelectValue placeholder="Select model" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {modelOptions.map((model) => (
                <SelectItem key={model} value={model}>
                  {model}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  );
}

function DraftPlatformOtherField() {
  const { control } = useFormContext<DraftState>();

  return (
    <FormField
      control={control}
      name="platformOther"
      render={({ field }) => (
        <FormItem className="form-item-field">
          <FormLabel className="form-label text-sm font-medium text-gray-800 dark:text-white">
            Platform Name <span className="text-error-600">*</span>
          </FormLabel>
          <FormControl>
            <Input
              placeholder="Enter the AI product or platform name"
              className="dark:bg-white dark:text-gray-800"
              {...field}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}

function DraftModelOtherField() {
  const { control } = useFormContext<DraftState>();

  return (
    <FormField
      control={control}
      name="modelOther"
      render={({ field }) => (
        <FormItem className="form-item-field">
          <FormLabel className="form-label text-sm font-medium text-gray-800 dark:text-white">
            AI System/Model <span className="text-error-600">*</span>
          </FormLabel>
          <FormControl>
            <Input
              placeholder="Enter the AI system or model name"
              className="dark:bg-white dark:text-gray-800"
              {...field}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}

function DraftAddButton({ onClick }: { onClick: () => void }) {
  const { control: draftControl } = useFormContext<DraftState>();
  const { control: parentControl } = useAiFlawFormContext();

  const [platform, model, platformOther, modelOther] = useWatch({
    control: draftControl,
    name: ["platform", "model", "platformOther", "modelOther"],
  });
  const systems =
    useWatch({ control: parentControl, name: "reporterDetails.systems" }) ?? [];

  const isOther = platform === OTHER_PLATFORM_LABEL;
  const hasPlatform = isOther
    ? platformOther.trim().length > 0
    : platform.length > 0;
  const hasModel = isOther
    ? modelOther.trim().length > 0
    : model.length > 0;
  const canAdd = hasPlatform && hasModel && systems.length < MAX_SYSTEMS;

  return (
    <Button
      type="button"
      variant="default"
      className="w-fit"
      disabled={!canAdd}
      onClick={onClick}
    >
      <Plus className="size-4" />
      Add AI System or Product
    </Button>
  );
}

function DraftSystemsCounter({
  control,
}: {
  control: Control<AiFlawReportSchema>;
}) {
  const systems = useWatch({ control, name: "reporterDetails.systems" }) ?? [];

  return (
    <span className="text-sm text-gray-500">
      {systems.length}/{MAX_SYSTEMS}
    </span>
  );
}

function DraftPlatformModelField() {
  const { control } = useFormContext<DraftState>();
  const platform = useWatch({ control, name: "platform" });
  const isOther = platform === OTHER_PLATFORM_LABEL;

  return isOther ? <DraftPlatformOtherField /> : <DraftModelField />;
}

function DraftModelOtherFieldWrapper() {
  const { control } = useFormContext<DraftState>();
  const platform = useWatch({ control, name: "platform" });
  const isOther = platform === OTHER_PLATFORM_LABEL;

  if (!isOther) return null;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <DraftModelOtherField />
    </div>
  );
}

function DraftFormFields() {
  const { control, setValue } = useFormContext<DraftState>();

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FormField
          control={control}
          name="platform"
          render={({ field }) => (
            <FormItem className="form-item-field">
              <FormLabel className="form-label text-sm font-medium text-gray-800 dark:text-white">
                AI Provider{" "}
                <span className="text-error-600">*</span>
              </FormLabel>
              <Select
                value={field.value}
                onValueChange={(value) => {
                  field.onChange(value);
                  setValue("model", "");
                  setValue("platformOther", "");
                  setValue("modelOther", "");
                }}
              >
                <FormControl>
                  <SelectTrigger className="w-full dark:bg-white dark:text-gray-800">
                    <SelectValue placeholder="Select product" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {AI_PLATFORMS.map((p) => (
                    <SelectItem key={p} value={p}>
                      {p}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <DraftPlatformModelField />
      </div>

      <DraftModelOtherFieldWrapper />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FormField
          control={control}
          name="accessMethod"
          render={({ field }) => (
            <FormItem className="form-item-field">
              <FormLabel className="form-label text-sm font-medium text-gray-800 dark:text-white">
                Access Method
              </FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className="w-full dark:bg-white dark:text-gray-800">
                    <SelectValue placeholder="How accessed?" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {ACCESS_METHODS.map((method) => (
                    <SelectItem key={method} value={method}>
                      {method}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="version"
          render={({ field }) => (
            <FormItem className="form-item-field">
              <FormLabel className="form-label text-sm font-medium text-gray-800 dark:text-white">
                Version
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g., gpt-4-0125-preview"
                  className="dark:bg-white dark:text-gray-800"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
    </>
  );
}

function AiSystemDraftForm({
  onAdd,
}: {
  onAdd: (entry: AiSystemConfig) => void;
}) {
  const { control: parentControl } = useAiFlawFormContext();
  const draftForm = useForm<DraftState>({
    defaultValues: EMPTY_DRAFT,
  });

  const { handleSubmit, reset } = draftForm;

  const onSubmit = useCallback(
    (data: DraftState) => {
      const isOther = data.platform === OTHER_PLATFORM_LABEL;

      const entry: AiSystemConfig = {
        platform: isOther ? data.platformOther.trim() : data.platform,
        model: isOther ? data.modelOther.trim() : data.model,
        ...(data.accessMethod && { accessMethod: data.accessMethod }),
        ...(data.version.trim() && { version: data.version.trim() }),
      };

      onAdd(entry);
      reset(EMPTY_DRAFT);
    },
    [onAdd, reset],
  );

  return (
    <Form {...draftForm}>
      <Item variant="outline" className="form-item-card">
        <ItemContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-500">
              Add an AI System
            </span>
            <DraftSystemsCounter control={parentControl} />
          </div>

          <DraftFormFields />

          <DraftAddButton onClick={handleSubmit(onSubmit)} />
        </ItemContent>
      </Item>
    </Form>
  );
}

function SystemChipsList() {
  const { control, setValue, getValues } = useAiFlawFormContext();
  const systems = useWatch({ control, name: "reporterDetails.systems" }) ?? [];

  const handleRemove = useCallback(
    (index: number) => {
      const current = getValues("reporterDetails.systems") ?? [];
      setValue(
        "reporterDetails.systems",
        current.filter((_, i) => i !== index),
        { shouldValidate: true },
      );
    },
    [getValues, setValue],
  );

  if (systems.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {systems.map((system, index) => (
        <span
          key={index}
          className="inline-flex items-center gap-2 rounded-full border-2 border-blue-200 bg-blue-50 px-4 py-2 text-sm text-gray-600"
        >
          {formatChipLabel(system)}
          <button
            type="button"
            onClick={() => handleRemove(index)}
            className="text-gray-400 transition-colors hover:text-gray-600"
            aria-label={`Remove ${formatChipLabel(system)}`}
          >
            <X className="size-3.5" />
          </button>
        </span>
      ))}
    </div>
  );
}

export function AiSystemInfo() {
  const { setValue, getValues } = useAiFlawFormContext();

  const handleAddSystem = useCallback(
    (entry: AiSystemConfig) => {
      const current = getValues("reporterDetails.systems") ?? [];
      if (current.length >= MAX_SYSTEMS) return;
      setValue("reporterDetails.systems", [...current, entry], {
        shouldValidate: true,
      });
    },
    [getValues, setValue],
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Image
          src="/icons/form/robot.svg"
          alt=""
          aria-hidden="true"
          width={20}
          height={20}
        />
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
          AI System Configurations
        </h3>
      </div>
      <p className="text-sm text-gray-500">
        Add each Product + Model + Access Method combination affected by this
        issue (up to {MAX_SYSTEMS})
      </p>

      <AiSystemDraftForm onAdd={handleAddSystem} />
      <SystemChipsList />

      <p className="text-center text-sm text-gray-500">
        Don&apos;t worry if you&apos;re unsure about technical details. Select
        &quot;I&apos;m not sure&quot; in the AI Model dropdown.
      </p>
    </div>
  );
}
