import Image from "next/image";

export function WarningMessage() {
  return (
    <div className="flex items-center justify-center gap-2">
      <Image
        src="/icons/form/warning.svg"
        alt=""
        aria-hidden="true"
        width={21}
        height={20}
      />
      <p className="text-sm font-medium text-gray-500 dark:text-gray-300">
        Please do not include sensitive information, especially CSAM or personal
        data
      </p>
    </div>
  );
}
