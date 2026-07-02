# Code Snippets for Maintainability Tasks

This document provides code snippets and locations for the four main maintainability tasks requested by the client.

---

## 1. Adding a New Input Field at Any Stage

### Overview

Fields are defined in configuration files and automatically rendered through a generic field renderer. Adding a new field requires:

1. Adding the field to the schema (validation)
2. Adding the field configuration
3. Adding the field to the UI component (if needed)

### Code Locations

#### Field Configuration Files (by stage)

- **Classify Report**: `src/entities/ai-flaw-report/model/form-data/` - No dedicated file, fields are in schema
- **Reporter & System Details**: `src/entities/ai-flaw-report/model/form-data/reporter-fields-config.ts`
- **Incident Description**: `src/entities/ai-flaw-report/model/form-data/incident-description-fields-config.ts`
- **Evidence & Reproduction**: `src/entities/ai-flaw-report/model/form-data/evidence-fields-config.ts`
- **Impact & Risk Assessment**: `src/entities/ai-flaw-report/model/form-data/impact-assessment-fields-config.ts`
- **Security Incident Details**: `src/entities/ai-flaw-report/model/form-data/security-details-fields-config.ts`
- **Disclosure Plan**: `src/entities/ai-flaw-report/model/form-data/disclosure-plan-fields-config.ts`

#### Schema Definition

- **Location**: `src/entities/ai-flaw-report/model/schema.ts`
- **Purpose**: Defines Zod validation schemas for each form stage

#### Generic Field Renderer

- **Location**: `src/components/form-field-renderer.tsx`
- **Purpose**: Automatically renders fields based on their configuration (text, multi-select, single-select, textarea, etc.)
- **Note**: This is a reusable component that can be used across all form steps

### Example: Adding a Text Field

**Step 1: Add to Schema** (`src/entities/ai-flaw-report/model/schema.ts`)

```typescript
// Example: Adding to incidentDescriptionSchema
export const incidentDescriptionSchema = z.object({
  issueDescription: z.string().min(1).max(5000),
  // NEW FIELD:
  additionalContext: z.string().max(2000).optional(),
  // ... other fields
});
```

**Step 2: Add Field Configuration** (e.g., `src/entities/ai-flaw-report/model/form-data/incident-description-fields-config.ts`)

```typescript
export const ADDITIONAL_CONTEXT_FIELD: IncidentDescriptionFieldConfig = {
  name: "incidentDescription.additionalContext",
  title: "Additional Context",
  icon: "/icons/form/document.svg",
  label: "Any additional context about this incident",
  type: "textarea",
  rows: 3,
  maxLength: 2000,
  placeholder: "Provide any additional context...",
  description: "Optional field for additional information",
  required: false,
};
```

**Step 3: Use in Component** (e.g., `src/widgets/ai-flaw-report/incident-description-step/additional-context-field.tsx`)

```typescript
import { FormFieldRenderer } from "~/components/form-field-renderer";
import { ADDITIONAL_CONTEXT_FIELD } from "~/entities/ai-flaw-report/model/form-data/incident-description-fields-config";

// In your component:
<FormFieldRenderer
  name="incidentDescription.additionalContext"
  control={control}
  config={ADDITIONAL_CONTEXT_FIELD}
/>
```

### Example: Adding a Multi-Select Field

**Step 1: Schema** (`src/entities/ai-flaw-report/model/schema.ts`)

```typescript
export const incidentDescriptionSchema = z.object({
  // ... existing fields
  tags: z.array(z.string()).optional(), // NEW FIELD
});
```

**Step 2: Field Config** (e.g., `incident-description-fields-config.ts`)

```typescript
export const TAGS_FIELD: IncidentDescriptionFieldConfig = {
  name: "incidentDescription.tags",
  label: "Tags",
  type: "multi-select",
  options: ["security", "privacy", "bias", "performance", "other"],
  placeholder: "Select tags",
  description: "Categorize this incident",
  required: false,
};
```

**Step 3: Use in Component**

```typescript
<FormFieldRenderer
  name="incidentDescription.tags"
  control={control}
  config={TAGS_FIELD}
/>
```

### Example: Adding a Single-Select Dropdown

Same pattern as multi-select, but use `type: "select"` instead of `type: "multi-select"`:

```typescript
export const PRIORITY_FIELD: IncidentDescriptionFieldConfig = {
  name: "incidentDescription.priority",
  label: "Priority Level",
  type: "select",
  options: ["low", "medium", "high", "critical"],
  placeholder: "Select priority",
  required: true,
};
```

---

## 2. Swapping Out a Taxonomy for an Existing Multi-Choice

### Overview

Taxonomies (options lists) for multi-select and select fields are defined in the field configuration's `options` array. To swap a taxonomy, simply update the `options` array.

### Code Locations

#### Field Configuration Files

All field config files in `src/entities/ai-flaw-report/model/form-data/` contain `options` arrays for select/multi-select fields.

### Example: Swapping Taxonomy for "Harm Types"

**Location**: `src/entities/ai-flaw-report/model/form-data/impact-assessment-fields-config.ts`

**Current Configuration** (lines 75-130):

```typescript
export const HARM_TYPES_FIELD = {
  name: "impactAssessment.harmTypes",
  title: "Type of Harm/Impact",
  icon: "/icons/form/circle.svg",
  label: "Select all types of harm or impact that apply:",
  type: "input",
  options: [
    {
      value: "psychological_harm",
      label: "Psychological Harm",
      description: "Mental distress, anxiety, trauma",
    },
    {
      value: "financial_harm",
      label: "Financial Harm",
      description: "Economic losses, fraud, theft",
    },
    // ... more options
  ],
};
```

**To Swap Taxonomy**: Simply replace the `options` array:

```typescript
export const HARM_TYPES_FIELD = {
  // ... other properties stay the same
  options: [
    {
      value: "new_category_1",
      label: "New Category 1",
      description: "Description for new category",
    },
    {
      value: "new_category_2",
      label: "New Category 2",
      description: "Description for new category",
    },
    // ... new taxonomy options
  ],
};
```

**Note**: If the field uses a simple string array (not objects), it's even simpler:

```typescript
// For simple string arrays:
options: ["option1", "option2", "option3"],

// To swap:
options: ["new_option1", "new_option2", "new_option3"],
```

### Other Examples of Multi-Select Fields with Taxonomies

- **Platforms**: `src/entities/ai-flaw-report/model/form-data/reporter-details-data.ts` (PLATFORM_CONFIGS)
- **Models**: `src/entities/ai-flaw-report/model/form-data/ai-model-fields-config.ts`
- **Harm Types**: `src/entities/ai-flaw-report/model/form-data/impact-assessment-fields-config.ts`
- **Stakeholders**: `src/entities/ai-flaw-report/model/form-data/review-and-submit-fields-config.ts`

---

## 3. Adding a New Report Recipient (Stakeholder)

### Overview

Report recipients (stakeholders) are defined in a configuration file with visibility and selectability rules.

### Code Location

**Primary File**: `src/entities/ai-flaw-report/model/form-data/review-and-submit-fields-config.ts`

### Example: Adding a New Stakeholder

**Current Configuration** (lines 39-134):

```typescript
export const SUBMIT_STAKEHOLDERS_CONFIG = {
  title: "Submit to Stakeholders",
  icon: "/icons/form/plane.svg",
  description: "Choose organizations to notify about this issue...",
  stakeholders: [
    {
      name: "OpenAI",
      description: "Flaws that may be relevant to OpenAI models",
      isVisible: ({ platforms }) =>
        platforms?.includes("OpenAI (ChatGPT, API, Playground)") ?? false,
      isSelectable: true,
    },
    // ... more stakeholders
  ] as StakeholderConfig[],
};
```

**To Add a New Stakeholder**: Add a new object to the `stakeholders` array:

```typescript
export const SUBMIT_STAKEHOLDERS_CONFIG = {
  // ... existing config
  stakeholders: [
    // ... existing stakeholders
    {
      name: "New Organization",
      description: "Flaws that may be relevant to New Organization",
      // Always visible
      isVisible: () => true,
      isSelectable: true,
    },
    // OR with conditional visibility:
    {
      name: "Conditional Organization",
      description: "Only shown when certain conditions are met",
      isVisible: ({ platforms, models, realWorldHarm }) => {
        // Example: Show only if specific platform is selected
        return platforms?.includes("Specific Platform") ?? false;
      },
      isSelectable: true,
    },
  ] as StakeholderConfig[],
};
```

**Stakeholder Type Definition** (lines 19-37):

```typescript
export type StakeholderConfig = {
  name: string;
  description: string;
  /**
   * Condition function to determine if stakeholder should be visible
   * Returns true if stakeholder should be shown
   */
  isVisible?: (formData: {
    platforms?: string[];
    models?: string[];
    realWorldHarm?: boolean;
    huggingFaceModels?: string[];
  }) => boolean;
  /**
   * Whether this stakeholder is selectable (can be checked)
   * If false, stakeholder is shown but cannot be selected
   */
  isSelectable?: boolean;
};
```

**UI Component**: `src/widgets/ai-flaw-report/review-and-submit-step/submit-stakeholders.tsx`

- Automatically renders all stakeholders from the config
- Handles visibility filtering
- No changes needed to component when adding new stakeholders

**Platform-to-Stakeholder Mapping** (if needed):
If you want to auto-select a stakeholder based on platform selection, add to:

- **Location**: `src/entities/ai-flaw-report/model/form-data/review-and-submit-fields-config.ts` (lines 136-143)

```typescript
export const PLATFORM_TO_STAKEHOLDER_MAP: Record<string, string> = {
  "OpenAI (ChatGPT, API, Playground)": "OpenAI",
  "New Platform Name": "New Organization", // ADD THIS
  // ... existing mappings
};
```

---

## 4. Integration into Rendered Report, Storage, Download, and Sending

### Overview

All form data is automatically integrated into reports through the schema-based form system. The form data structure flows through:

1. Form state (React Hook Form)
2. Schema validation (Zod)
3. Report rendering (Review & Submit step)
4. Download (JSON export)
5. Database storage (server-side)
6. Sending to recipients (server-side)

### Code Locations

#### 1. Report Rendering (Review & Submit Step)

**Report Summary Component**: `src/widgets/ai-flaw-report/review-and-submit-step/report-summary/index.tsx`

- Displays a summary of the report
- Uses form data directly from React Hook Form

**Summary Field Components**:

- `src/widgets/ai-flaw-report/review-and-submit-step/report-summary/summary-field.tsx`
- `src/widgets/ai-flaw-report/review-and-submit-step/report-summary/risk-assessment.tsx`
- `src/widgets/ai-flaw-report/review-and-submit-step/report-summary/classification.tsx`
- `src/widgets/ai-flaw-report/review-and-submit-step/report-summary/stakeholders.tsx`

**How it works**: These components use `useWatch` or `useAiFlawFormContext` to access form values:

```typescript
import { useAiFlawFormContext } from "~/entities/ai-flaw-report/model/hooks/useAiFlawFormContext";

function MySummaryComponent() {
  const { getValues } = useAiFlawFormContext();
  const formData = getValues();
  // Access any field: formData.incidentDescription.issueDescription
  // etc.
}
```

#### 2. Download (JSON Export)

**Hook**: `src/entities/ai-flaw-report/model/hooks/useDownloadReport.ts`

**How it works**:

```typescript
export function useDownloadReport() {
  const { getValues } = useAiFlawFormContext();

  const downloadReport = useCallback(() => {
    const formData = getValues(); // Gets ALL form data
    if (!formData) return;

    const reportData = {
      metadata: {
        createdAt: new Date().toISOString(),
        schemaVersion: "1.0",
        reportType: getReportType(formData),
      },
      ...formData, // ALL form fields are included automatically
    };

    // Creates JSON file
    const blob = new Blob([JSON.stringify(reportData, null, 2)], {
      type: "application/json",
    });
    // ... download logic
  }, [getValues]);

  return { downloadReport };
}
```

**Component**: `src/widgets/ai-flaw-report/review-and-submit-step/download-report.tsx`

- Uses the hook above
- Automatically includes all form data

**Key Point**: Since `getValues()` returns all form data validated by the schema, any new field added to the schema is automatically included in the download.

#### 3. Database Storage

**Server Location**: `server/src/` (Strapi CMS)

**How it works**:

- Form submission goes through the form's `onSubmit` handler
- The complete form data (validated by Zod schema) is sent to the server
- Server stores the data in the database

**Form Submission**: `src/features/ai-flaw-report/multi-step-form/index.tsx`

```typescript
const onSubmit = (data: AiFlawReportSchema) => {
  // data contains ALL form fields
  // This is where you'd send to your API
  console.log(data);
};
```

**Key Point**: The `AiFlawReportSchema` type (inferred from Zod) automatically includes all fields defined in the schemas. Any new field added to a schema is automatically part of this type.

#### 4. Sending to Recipients

**Stakeholder Selection**: `src/widgets/ai-flaw-report/review-and-submit-step/submit-stakeholders.tsx`

- Stores selected stakeholders in: `reviewReport.selectedStakeholders`
- This is part of the form data, so it's included in downloads and database storage

**Form Schema**: `src/entities/ai-flaw-report/model/schema.ts`

```typescript
export const reviewReportSchema = z.object({
  selectedStakeholders: z.array(z.string()).min(1),
});
```

**Key Point**: When sending to recipients, the server can:

1. Read `selectedStakeholders` from the stored report
2. Send the report data to each selected stakeholder
3. All form data is available in the report object

---

## Summary: Automatic Integration

The architecture ensures that **any field added to the schema automatically flows through**:

1. ✅ **Form validation** (Zod schema)
2. ✅ **Type safety** (TypeScript types inferred from schema)
3. ✅ **Report rendering** (components access form data via `getValues()`)
4. ✅ **Download** (`getValues()` includes all form data)
5. ✅ **Database storage** (form submission includes all data)
6. ✅ **Sending to recipients** (report object includes all data)

**No additional integration work needed** - the form system handles it automatically!
