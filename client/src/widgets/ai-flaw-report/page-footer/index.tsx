import { useWatch } from "react-hook-form";
import Link from "next/link";

import { useAiFlawFormContext } from "~/entities/ai-flaw-report/model/hooks/useAiFlawFormContext";
import MainFooter from "~/app/(main)/_components/footer";

function FormAwareFooterContent() {
  const { control } = useAiFlawFormContext();
  const currentStep = useWatch({ control, name: "step" });

  if (currentStep === "SUBMISSION_SUCCESS") {
    return <MainFooter />;
  }

  return <DefaultFooter />;
}

function DefaultFooter() {
  return (
    <footer className="bg-gray-100 p-8 pb-16 text-center dark:bg-gray-900">
      <p className="text-sm font-normal text-gray-700 dark:text-gray-400">
        This form will guide you through a structured reporting process to help
        AI developers and others address issues.
      </p>
      <p className="text-sm font-normal text-gray-700 dark:text-gray-400">
        Need help? Contact{" "}
        <Link
          className="text-gray-blue-500 font-bold underline"
          href="mailto:aiflawreports@gmail.com"
        >
          aiflawreports@gmail.com
        </Link>
      </p>
    </footer>
  );
}

export function AiFlawReportFooter() {
  const formContext = useAiFlawFormContext();

  if (!formContext) {
    return <DefaultFooter />;
  }

  return <FormAwareFooterContent />;
}
