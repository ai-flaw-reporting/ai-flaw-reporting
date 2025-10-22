import { FileText, Trash } from "lucide-react";
import { useWatch } from "react-hook-form";
import { Button } from "~/components/ui/button";
import { Item, ItemContent } from "~/components/ui/item";
import { useAiFlawFormContext } from "~/entities/ai-flaw-report";

export function FileList() {
  const { control, setValue } = useAiFlawFormContext();

  const attachments = useWatch({
    control,
    name: "evidence.attachments",
  });

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  if (!attachments?.length) return null;

  return (
    <ul className="space-y-2">
      {attachments.map((file: File, index: number) => (
        <li key={`${file.name}-${index}`}>
          <Item className="px-0 py-1.5">
            <ItemContent className="flex flex-row items-center justify-between">
              <div className="flex items-center space-x-3">
                <FileText
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-300">
                    {formatFileSize(file.size)}
                  </p>
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  const updatedFiles = attachments.filter(
                    (_, i) => i !== index,
                  );
                  setValue("evidence.attachments", updatedFiles);
                }}
                className="h-8 w-8 p-0"
              >
                <Trash className="h-4 w-4" aria-hidden="true" />
              </Button>
            </ItemContent>
          </Item>
        </li>
      ))}
    </ul>
  );
}
