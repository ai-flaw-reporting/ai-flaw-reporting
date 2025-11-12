import {
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

import { type FieldConfig } from "~/entities/ai-flaw-report/model/types";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { CountrySelect } from "~/components/ui/country-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

import { cn } from "~/lib/utils";
import { FieldTooltip } from "~/components/field-tooltip";

import type { RowComponentProps } from "react-window";
import { List } from "react-window";
import {
  MultiSelect,
  MultiSelectItem,
  MultiSelectGroup,
  MultiSelectContent,
  MultiSelectTrigger,
  MultiSelectValue,
} from "~/components/ui/multi-select";

type Props<T extends FieldValues> = {
  name: FieldPath<T>;
  control: Control<T>;
  config: FieldConfig;
  className?: string;
  inputClassName?: string;
};

type OptionRowProps = RowComponentProps & {
  options: string[];
};

function OptionRow({ index, style, options }: OptionRowProps) {
  const option = options[index]!;
  return (
    <div style={style}>
      <SelectItem value={option}>{option}</SelectItem>
    </div>
  );
}

export function FormFieldRenderer<T extends FieldValues>({
  name,
  control,
  config,
  className = "form-item-select",
  inputClassName,
}: Props<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel className="form-label">
            {config.label}
            {config.required && <span className="text-error-600"> *</span>}
          </FormLabel>

          <FormControl>
            <div className="relative">
              {config.type === "input" && (
                <Input
                  {...field}
                  value={field.value ?? ""}
                  type={config.inputType ?? "text"}
                  placeholder={config.placeholder}
                  className={cn("form-input-with-tooltip", inputClassName)}
                />
              )}

              {config.type === "multi-select" && (
                <MultiSelect
                  values={field.value ?? []}
                  onValuesChange={(values) => {
                    if (!Array.isArray(values) || !values.length) return;
                    field.onChange(values);
                  }}
                >
                  <MultiSelectTrigger className="h-[42px] w-full max-w-[728px] dark:bg-white dark:text-gray-800 dark:hover:bg-white">
                    <MultiSelectValue
                      placeholder={config.placeholder}
                      className="*:!text-[14px] *:text-gray-800"
                    />
                  </MultiSelectTrigger>
                  <MultiSelectContent>
                    <MultiSelectGroup>
                      {config.options.map((option, index) => (
                        <MultiSelectItem key={option + index} value={option}>
                          {option}
                        </MultiSelectItem>
                      ))}
                    </MultiSelectGroup>
                  </MultiSelectContent>
                </MultiSelect>
              )}

              {config.type === "select" && (
                <Select
                  value={field.value ?? ""}
                  onValueChange={(newValue) => {
                    if (!newValue) return;
                    field.onChange(newValue);
                  }}
                >
                  <SelectTrigger
                    className={cn(
                      "text-md w-full dark:bg-white",
                      field.value ? "dark:text-gray-800" : "dark:text-gray-500",
                    )}
                  >
                    <SelectValue placeholder={config.placeholder}>
                      {field.value}
                    </SelectValue>
                  </SelectTrigger>

                  <SelectContent>
                    {config.options.length > 0 ? (
                      <List
                        rowComponent={OptionRow}
                        rowCount={config.options.length}
                        rowHeight={36}
                        defaultHeight={200}
                        overscanCount={5}
                        rowProps={{ options: config.options }}
                      />
                    ) : (
                      <SelectItem value="select platform" disabled>
                        Select platform first
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
              )}

              {config.type === "country" && (
                <CountrySelect
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  placeholder={config.placeholder}
                />
              )}

              <FieldTooltip
                ariaLabel={`${config.label} help`}
                text=""
                className={config.tooltipClassName}
              />
            </div>
          </FormControl>

          {config.description && (
            <FormDescription className="form-description">
              {config.description}
            </FormDescription>
          )}
          {config.showMessage && <FormMessage />}
        </FormItem>
      )}
    />
  );
}
