import Image from "next/image";

import {
  EVIDENCE_FIELDS,
  useAiFlawFormContext,
} from "~/entities/ai-flaw-report";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Item, ItemContent, ItemTitle } from "~/components/ui/item";
import { ResizableCodeEditor } from "./resizable-code-editor";

export function ProofOfConceptField() {
  const { control } = useAiFlawFormContext();

  const isDark =
    typeof document !== "undefined" &&
    document.documentElement.classList.contains("dark");

  return (
    <Item variant="outline" className="form-item-card">
      <ItemContent className="space-y-8">
        <ItemTitle className="form-title flex items-baseline gap-4">
          {EVIDENCE_FIELDS.proofOfConcept.icon && (
            <Image
              src={EVIDENCE_FIELDS.proofOfConcept.icon}
              alt=""
              aria-hidden
              width={24}
              height={24}
            />
          )}
          {EVIDENCE_FIELDS.proofOfConcept.title}
        </ItemTitle>

        <FormField
          control={control}
          name={EVIDENCE_FIELDS.proofOfConcept.name}
          render={({ field }) => (
            <FormItem className="form-item-field">
              <FormLabel className="form-label">
                {EVIDENCE_FIELDS.proofOfConcept.label}
              </FormLabel>

              <FormControl>
                <ResizableCodeEditor
                  value={(field.value as string) ?? ""}
                  onChange={field.onChange}
                  placeholder={EVIDENCE_FIELDS.proofOfConcept.placeholder}
                  isDark={isDark}
                />
              </FormControl>

              {EVIDENCE_FIELDS.proofOfConcept.description && (
                <FormDescription className="form-description font-normal text-gray-600 dark:text-gray-300">
                  {EVIDENCE_FIELDS.proofOfConcept.description}
                </FormDescription>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
      </ItemContent>
    </Item>
  );
}
