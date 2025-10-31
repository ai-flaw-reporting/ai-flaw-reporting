import Link from "next/link";

import { useAiFlawFormContext } from "~/entities/ai-flaw-report/model/hooks/useAiFlawFormContext";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "~/components/ui/form";
import { Checkbox } from "~/components/ui/checkbox";
import { ItemContent, ItemTitle, ItemDescription } from "~/components/ui/item";

export function CsamWarningContent() {
  const { control } = useAiFlawFormContext();

  return (
    <ItemContent className="gap-0">
      <ItemTitle className="text-error-950 text-md mb-1 font-bold">
        Important:
      </ItemTitle>
      <ItemDescription className="text-error-500 mb-3 text-sm font-normal">
        Reports involving{" "}
        <abbr
          className="font-semibold underline"
          title="Child Sexual Abuse Material"
        >
          CSAM
        </abbr>{" "}
        should be directed to appropriate authorities like{" "}
        <Link
          href="https://www.missingkids.org/"
          target="_blank"
          className="hover:!text-error-600 underline"
        >
          <abbr title="National Center for Missing & Exploited Children">
            NCMEC
          </abbr>
        </Link>
        ,{" "}
        <Link
          href="https://www.iwf.org.uk/"
          target="_blank"
          className="hover:!text-error-600 underline"
        >
          <abbr title="Internet Watch Foundation">IWF</abbr>
        </Link>
        , or local law enforcement. This platform cannot accept or process CSAM
        material directly.
      </ItemDescription>
      <FormField
        control={control}
        name="classifyReport.csam_acknowledgment"
        render={({ field }) => (
          <FormItem className="bg-error-100 flex items-center border-none p-0">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
                className="border-black bg-white data-[state=checked]:bg-indigo-500 dark:bg-white"
              />
            </FormControl>
            <FormLabel className="text-error-950 cursor-pointer text-sm font-normal">
              I understand I cannot attach or submit CSAM material through this
              form
            </FormLabel>
          </FormItem>
        )}
      />
    </ItemContent>
  );
}
