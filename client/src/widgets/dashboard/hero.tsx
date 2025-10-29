import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { routes } from "~/lib/routes";

export function DashboardHero() {
  return (
    <div className="mx-auto max-w-[896px] space-y-6 text-center">
      <h1
        id="dashboard-title"
        className="display-lg text-gray-750 leading-12 font-bold dark:text-white"
      >
        AI Transparency Dashboard
      </h1>
      <p className="text-gray-neutral-450 text-lg leading-8 font-normal dark:text-gray-100">
        Track public reports on AI system flaws, biases, and security issues.
        Our community-driven platform promotes transparency and accountability
        in artificial intelligence.
      </p>
      <div className="space-x-4">
        <Button asChild>
          <Link
            className="min-h-11 !bg-blue-500 !px-8 !py-3 text-sm font-normal text-white"
            href={routes.report}
          >
            Submit a Report <ArrowRight aria-hidden="true" size={16} />
          </Link>
        </Button>
        <Button asChild>
          <Link
            className="!text-gray-750 !bg-gray-modern-50 min-h-11 !px-8 !py-3 text-sm font-normal"
            href="#"
          >
            Learn More
          </Link>
        </Button>
      </div>
    </div>
  );
}
