"use client";

import { IssueDescriptionField } from "./issue-description-field";
import { BehaviorFields } from "./behavior-fields";
import { PolicyViolationSection } from "./policy-violation-section";
import { CsamWarning } from "./csam-warning";

export function IncidentDescriptionStep() {
  return (
    <div className="space-y-4">
      <IssueDescriptionField />
      <BehaviorFields />
      <PolicyViolationSection />
      <CsamWarning />
    </div>
  );
}
