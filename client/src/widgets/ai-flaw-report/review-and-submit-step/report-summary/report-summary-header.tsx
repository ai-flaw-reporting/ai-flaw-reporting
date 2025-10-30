import Image from "next/image";

type Props = {
  title: string;
  iconSrc: string;
};

export default function ReportSummaryHeader({ title, iconSrc }: Props) {
  return (
    <div className="form-title flex items-baseline gap-4">
      <Image src={iconSrc} alt="" width={18} height={24} aria-hidden="true" />
      <p>{title}</p>
    </div>
  );
}
