import { EmbargoDetails } from "./embargo-details";
import { PublicDisclosureIntent } from "./public-disclosure-intent";
import { DisclosureDetails } from "./disclosure-details";
import { DisclosureGuidance } from "./disclosure-guidance";

export function DisclosurePlanStep() {
  return (
    <div className="space-y-4">
      <PublicDisclosureIntent />
      <EmbargoDetails />
      <DisclosureDetails />
      <DisclosureGuidance />
    </div>
  );
}
