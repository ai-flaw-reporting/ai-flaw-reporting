import Link from "next/link";
import { Separator } from "~/components/ui/separator";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[#EAECF0] bg-white px-4 py-5 text-center text-sm font-normal md:px-8 dark:border-gray-700 dark:bg-gray-800">
      <div className="mx-auto flex max-w-[1226px] flex-col gap-8 py-5 text-gray-700 dark:text-gray-100">
        <p>
          An open-source project to make AI flaw and incident reporting easy,
          secure, and accessible. By researchers at MIT and Stanford University.
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

      <p className="text-[#667085] dark:text-gray-400">
        © {year} AI Flaw Reporting
      </p>
    </footer>
  );
}
