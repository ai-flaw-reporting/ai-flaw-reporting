import { useFormState } from "react-hook-form";
import type { AiFlawReportSchema } from "../types";

export const useAiFlawFormState = () => useFormState<AiFlawReportSchema>();
