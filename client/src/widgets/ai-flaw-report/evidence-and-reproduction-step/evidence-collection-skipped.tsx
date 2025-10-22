import { Item, ItemContent, ItemTitle } from "~/components/ui/item";
import Image from "next/image";

export function EvidenceCollectionSkipped() {
  return (
    <Item variant="outline" className="form-item-card border-text-gray-200">
      <ItemContent className="items-center space-y-4 text-center">
        <ItemTitle className="form-title flex flex-col gap-4 text-center">
          <Image
            src="icons/form/warning-filled.svg"
            alt=""
            aria-hidden="true"
            width={59.17}
            height={55.76}
          />
          Evidence Collection Skipped
        </ItemTitle>
        <p className="text-sm font-normal text-gray-700 dark:text-gray-300">
          For safety, we're skipping evidence collection since this involves{" "}
          <span className="font-semibold text-indigo-500 underline">CSAM.</span>{" "}
          <br /> We'll proceed with the information you've already provided.
        </p>
      </ItemContent>
    </Item>
  );
}
