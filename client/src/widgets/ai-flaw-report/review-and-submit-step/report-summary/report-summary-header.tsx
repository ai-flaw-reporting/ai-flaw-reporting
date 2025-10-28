import Image from "next/image";
import { Button } from "~/components/ui/button";
import { SquarePen } from "lucide-react";

type Props = {
  title: string;
  iconSrc: string;
  onEdit?: () => void;
};

export default function ReportSummaryHeader({ title, iconSrc, onEdit }: Props) {
  return (
    <>
      <div className="form-title flex items-baseline gap-4">
        <Image src={iconSrc} alt="" width={18} height={24} aria-hidden="true" />
        <p>{title}</p>
      </div>
      <Button
        variant="outline"
        className="badge gap-1 !pr-2 !pl-[5px] dark:hover:bg-white"
        onClick={onEdit}
      >
        <SquarePen className="size-[11px] text-gray-800" />
        Edit Report
      </Button>
    </>
  );
}
