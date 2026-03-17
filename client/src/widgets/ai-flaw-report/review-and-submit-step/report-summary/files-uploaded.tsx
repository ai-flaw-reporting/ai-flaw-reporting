import { Badge } from "~/components/ui/badge";
import { useAiFlawFormContext } from "~/entities/ai-flaw-report/model/hooks/useAiFlawFormContext";

export default function FilesUploaded() {
  const { getValues } = useAiFlawFormContext();
  const attachments = getValues("evidence.attachments");
  const count = attachments?.length ?? 0;

  return (
    <Badge variant="outline" className="badge">
      {count} {count === 1 ? "file" : "files"}
    </Badge>
  );
}
