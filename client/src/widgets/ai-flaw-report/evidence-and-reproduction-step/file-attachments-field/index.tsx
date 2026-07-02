import { Item, ItemContent, ItemTitle } from "~/components/ui/item";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import React from "react";
import { Upload } from "lucide-react";
import { Button } from "~/components/ui/button";
import { FileList } from "./file-list";
import { useAiFlawFormContext } from "~/entities/ai-flaw-report/model/hooks/useAiFlawFormContext";
import { EVIDENCE_FIELDS } from "~/entities/ai-flaw-report/model/form-data/evidence-fields-config";

export function FileAttachmentsField() {
  const { control } = useAiFlawFormContext();

  return (
    <Item variant="outline" className="form-item-card">
      <ItemContent className="space-y-8">
        <ItemTitle className="form-title flex items-baseline gap-4">
          <Upload className="h-6 w-6 text-gray-500" aria-hidden="true" />
          {EVIDENCE_FIELDS.attachments.title}
        </ItemTitle>

        <FormField
          control={control}
          name={EVIDENCE_FIELDS.attachments.name}
          render={({ field }) => (
            <FormItem className="form-item-field">
              <FormLabel className="form-label text-gray-500 dark:text-gray-300">
                {EVIDENCE_FIELDS.attachments.label}
              </FormLabel>
              <FormControl>
                <div className="w-full">
                  <input
                    type="file"
                    id="attachmentsInput"
                    className="sr-only"
                    multiple
                    aria-hidden="true"
                    accept=".pdf,.docx,.jpg,.jpeg,.png"
                    onChange={(e) => {
                      const files = e.target.files;
                      if (files) {
                        const newFiles = Array.from(files);
                        const existingFiles = (field.value as File[]) || [];
                        field.onChange([...existingFiles, ...newFiles]);
                      }
                    }}
                  />
                  <Button
                    variant="outline"
                    className="text-md h-11 w-full cursor-pointer gap-2 py-2.5 font-semibold text-gray-700 dark:hover:bg-white"
                    onClick={() => {
                      const inputEl = document.getElementById(
                        "attachmentsInput",
                      ) as HTMLInputElement | null;
                      if (inputEl) inputEl.click();
                    }}
                  >
                    <Upload
                      className="h-5 w-5 text-gray-700"
                      aria-hidden="true"
                    />
                    Choose Files
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FileList />
      </ItemContent>
    </Item>
  );
}
