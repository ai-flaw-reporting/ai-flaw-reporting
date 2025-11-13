import dynamic from "next/dynamic";
import { Item, ItemContent, ItemTitle } from "~/components/ui/item";
import { Badge } from "~/components/ui/badge";

const CheckCircleOutlineIcon = dynamic(() =>
  import("~/components/icons/check-circle-outline-icon").then(
    (mod) => mod.CheckCircleOutlineIcon,
  ),
);

type Props = {
  selectedStakeholders: string[];
};

export function ReportComplited({ selectedStakeholders }: Props) {
  if (!selectedStakeholders.length) {
    return null;
  }
  return (
    <Item variant="outline" className="form-item-card w-full">
      <ItemContent className="flex flex-col items-center justify-center gap-8">
        <ItemTitle className="form-title flex flex-col items-center justify-center gap-4">
          <CheckCircleOutlineIcon className="text-success-700 size-12.5" />
          Report Completed
        </ItemTitle>
        <div className="flex flex-col items-center justify-center gap-1.5">
          <p className="text-center text-sm font-medium text-gray-700 dark:text-gray-100">
            Thank you for contributing to AI safety. Your report helps improve
            the security and reliability of AI systems.
          </p>

          <div className="space-y-1.5">
            <p className="text-center text-sm font-medium text-gray-700 dark:text-gray-100">
              Submitted to:
            </p>
            <ul className="flex flex-wrap justify-center gap-1.5">
              {selectedStakeholders.map((stakeholder) => (
                <li key={stakeholder}>
                  <Badge variant="outline" className="badge">
                    {stakeholder}
                  </Badge>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </ItemContent>
    </Item>
  );
}
