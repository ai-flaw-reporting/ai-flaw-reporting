import Image from "next/image";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { routes } from "~/lib/routes";

export function ReportBanner() {
  return (
    <>
      <div className="mb-0 bg-white px-8 py-12 pb-12">
        <section className="mx-auto max-w-[1280px] space-y-8 rounded-2xl bg-indigo-100 bg-[url('/images/report-background.png')] bg-cover bg-center bg-no-repeat py-16 text-center">
          <header className="mb-5 space-y-8">
            <Image
              src="/icons/bug.svg"
              alt=""
              aria-hidden="true"
              width={53}
              height={53}
              style={{
                filter:
                  "invert(30%) sepia(89%) saturate(3447%) hue-rotate(231deg) brightness(91%) contrast(101%)",
              }}
              className="mx-auto"
            />
            <h2 className="display-md font-semibold text-gray-800">
              Found Something Worth Reporting?
            </h2>
          </header>
          <p className="mx-auto max-w-[794px] text-xl font-normal text-gray-800">
            Help improve AI safety by submitting a report. Whether it’s a flaw,
            bug, or something that doesn’t sit right. Your insight can make a
            real difference.
          </p>
          <Button asChild>
            <Link
              className="text-md bg-blue-ai px-5 py-3 font-semibold text-white"
              href={routes.report}
            >
              Report flaw
            </Link>
          </Button>
        </section>
      </div>
      <Separator aria-hidden="true" />
    </>
  );
}
