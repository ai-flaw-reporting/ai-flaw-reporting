import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white px-[107px] py-5 text-center text-sm font-normal">
      <div className="flex flex-col gap-8 py-5 text-gray-700">
        <p>
          A Harvard University open-source project making AI flaw reporting
          easy, secure, and accessible. <br /> We're building safer AI systems
          through community-driven reports and open research.
        </p>
        <p>Need help? Contact</p>
        <Link
          className="font-bold text-indigo-500 underline"
          href="mailto:aiflareports@gmail.com"
        >
          aiflareports@gmail.com
        </Link>
      </div>

      <Separator className="mb-5" aria-hidden="true" />

      <p className="text-gray-500">
        © {year} AI Flaw Reporting. A Harvard University Research Initiative.
      </p>
    </footer>
  );
}
