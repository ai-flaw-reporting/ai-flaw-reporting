import Link from "next/link";

export function AiFlawReportFooter() {
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
