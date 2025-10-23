import Image from "next/image";
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
import {
  DETECTION_METHOD_FIELD,
  useAiFlawFormContext,
} from "~/entities/ai-flaw-report";

export function SecurityIncidentDetails() {
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
            src={DETECTION_METHOD_FIELD.icon}
            alt=""
            width={24}
            height={24}
            aria-hidden="true"
          />
          {DETECTION_METHOD_FIELD.title}
        </ItemTitle>

        <FormField
          control={control}
          name="securityDetails.detectionMethod"
          render={({ field }) => (
            <FormItem className="form-item-field">
              <FormLabel className="form-label">
                {DETECTION_METHOD_FIELD.label}
              </FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="text-md w-full dark:bg-white dark:text-gray-800">
                    <SelectValue
                      placeholder={DETECTION_METHOD_FIELD.placeholder}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {DETECTION_METHOD_FIELD.options?.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription className="text-gray-600 dark:text-gray-100">
                {DETECTION_METHOD_FIELD.description}
              </FormDescription>
            </FormItem>
          )}
        />
      </ItemContent>
    </Item>
  );
}
