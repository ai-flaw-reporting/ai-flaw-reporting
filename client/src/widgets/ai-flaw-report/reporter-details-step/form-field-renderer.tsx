import {
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

import { type FieldConfig } from "~/entities/ai-flaw-report";

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

type Props<T extends FieldValues> = {
  name: FieldPath<T>;
  control: Control<T>;
  config: FieldConfig;
  className?: string;
  inputClassName?: string;
};

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
                    <SelectValue placeholder={config.placeholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {config.options.length > 0 ? (
                      config.options.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))
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
                text="Help text placeholder"
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
