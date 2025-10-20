import { useFormContext } from "react-hook-form";
import type { AiFlawReportSchema } from "../types";

export const useAiFlawFormContext = () => useFormContext<AiFlawReportSchema>();
