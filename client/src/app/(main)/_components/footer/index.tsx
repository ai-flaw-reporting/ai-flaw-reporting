import Link from "next/link";
import { Separator } from "~/components/ui/separator";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white px-[107px] py-5 text-center text-sm font-normal dark:bg-gray-800">
      <div className="flex flex-col gap-8 py-5 text-gray-700 dark:text-gray-100">
        <p>
          An open-source project to make AI flaw and incident reporting easy,
          secure, and accessible. <br /> By researchers.
        </p>
        <p>Need help? Contact</p>
        <Link
          className="font-bold text-indigo-500 underline"
          href="mailto:aiflawreports@gmail.com"
        >
          aiflawreports@gmail.com
        </Link>
      </div>

      <Separator className="mb-5" aria-hidden="true" />

      <p className="text-gray-500 dark:text-gray-400">
        © {year} AI Flaw Reporting.
      </p>
    </footer>
  );
}
