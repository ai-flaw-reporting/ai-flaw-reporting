import { X } from "lucide-react";

import { Button } from "~/components/ui/button";
import { ItemMedia } from "~/components/ui/item";

import { WarningIcon } from "./warning-icon";

type Props = {
  onDismiss: () => void;
};

export function CsamWarningHeader({ onDismiss }: Props) {
  return (
    <ItemMedia className="flex w-full items-center justify-between">
      <WarningIcon className="h-5 w-5 text-red-600" aria-hidden="true" />
      <Button
        variant="ghost"
        onClick={onDismiss}
        className="absolute top-0 right-0 cursor-pointer !p-2 text-red-500 hover:bg-red-100 hover:text-red-600"
        aria-label="Dismiss CSAM warning"
      >
        <X className="!h-5 !w-5" aria-hidden="true" />
      </Button>
    </ItemMedia>
  );
}
