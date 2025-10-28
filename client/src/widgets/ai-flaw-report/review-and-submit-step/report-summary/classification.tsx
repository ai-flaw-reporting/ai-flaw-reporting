import dynamic from "next/dynamic";
import { useAiFlawFormContext } from "~/entities/ai-flaw-report/model/hooks/useAiFlawFormContext";

const CheckCircleOutlineIcon = dynamic(() =>
  import("~/components/icons/check-circle-outline-icon").then(
    (mod) => mod.CheckCircleOutlineIcon,
  ),
);

export default function Classification() {
  const { getValues } = useAiFlawFormContext();

  const realWorldHarm = getValues("classifyReport.real_world_harm");
  const exploitable = getValues("classifyReport.malicious_use");
  return (
    <div className="space-y-2 text-xs font-bold text-gray-700">
      <p className="flex items-baseline gap-2 dark:text-gray-200">
        <CheckCircleOutlineIcon className="text-gray-900 dark:text-gray-100" />{" "}
        Real-World harm: {realWorldHarm ? "Yes" : "No"}
      </p>
      <p className="flex items-center gap-2 dark:text-gray-200">
        <CheckCircleOutlineIcon className="text-warning-500" /> Exploitable:{" "}
        {exploitable ? "Yes" : "No"}
      </p>
    </div>
  );
}
