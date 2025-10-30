import { Button } from "~/components/ui/button";
import { ItemActions } from "~/components/ui/item";
import Link from "next/link";

type Props = {
  onDismiss: () => void;
};

export function CsamWarningActions({ onDismiss }: Props) {
  return (
    <ItemActions className="flex w-full justify-start gap-3">
      <Button
        variant="ghost"
        onClick={onDismiss}
        className="text-error-600 hover:text-error-700 hover:bg-error-100 h-5 cursor-pointer p-0 text-sm font-semibold"
        aria-label="Dismiss CSAM warning"
      >
        Dismiss
      </Button>
      <Link
        href="https://report.cybertip.org/"
        className="text-error-700 hover:text-error-800 text-sm font-semibold"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn more
      </Link>
    </ItemActions>
  );
}
