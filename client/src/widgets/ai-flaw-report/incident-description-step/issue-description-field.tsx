import Image from "next/image";

import {
  useAiFlawFormContext,
  ISSUE_DESCRIPTION_FIELD,
} from "~/entities/ai-flaw-report";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "~/components/ui/form";
import { Textarea } from "~/components/ui/textarea";
import { Item, ItemContent, ItemTitle } from "~/components/ui/item";

export function IssueDescriptionField() {
  const { control } = useAiFlawFormContext();

  return (
    <Item variant="outline" className="form-item-card">
      <ItemContent className="space-y-8">
        <ItemTitle className="form-title flex items-baseline gap-4">
          <Image
            src={ISSUE_DESCRIPTION_FIELD.icon}
            alt=""
            aria-hidden="true"
            width={20.42}
            height={26.81}
          />
          {ISSUE_DESCRIPTION_FIELD.title}
        </ItemTitle>

        <FormField
          control={control}
          name={ISSUE_DESCRIPTION_FIELD.name}
          render={({ field }) => (
            <FormItem className="form-item-field">
              <FormLabel className="form-label">
                {ISSUE_DESCRIPTION_FIELD.label}
              </FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  value={field.value ?? ""}
                  rows={ISSUE_DESCRIPTION_FIELD.rows}
                  maxLength={ISSUE_DESCRIPTION_FIELD.maxLength}
                  placeholder={ISSUE_DESCRIPTION_FIELD.placeholder}
                  className="min-h-32 !text-base font-normal placeholder:!text-base placeholder:!leading-6 dark:border-gray-300 dark:bg-gray-800 dark:placeholder:text-gray-400"
                />
              </FormControl>
              {ISSUE_DESCRIPTION_FIELD.description && (
                <FormDescription className="form-description font-normal dark:text-gray-300">
                  {ISSUE_DESCRIPTION_FIELD.description}
                </FormDescription>
              )}
            </FormItem>
          )}
        />
      </ItemContent>
    </Item>
  );
}
