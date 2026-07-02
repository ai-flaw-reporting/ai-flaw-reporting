import { Info } from "lucide-react";

export function WarningIcon({ className }: { className?: string }) {
  return (
    <div className="relative">
      <div className="absolute -top-[9.13px] -left-[9.13px] h-[38.54px] w-[38.54px] rounded-full border-2 border-red-600 opacity-10"></div>
      <div className="absolute -top-[4.06px] -left-[4.06px] h-[28.4px] w-[28.4px] rounded-full border-2 border-red-600 opacity-30"></div>
      <Info className={`${className} relative z-10`} aria-hidden="true" />
    </div>
  );
}
