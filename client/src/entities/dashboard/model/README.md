# Dashboard Static Data

This directory contains static JSON data files for the dashboard (used during development before backend integration).

Path: `client/src/entities/dashboard/model/`

## File Structure

### `impact.json`

Structure:

```json
[
  {
    "label": "string",
    "value": "string",
    "trend": "string",
    "iconUrl": "string"
  }
]
```

---

### `issue-categories.json`

Structure:

```json
[{ "label": "string", "value": 0, "color": "#RRGGBB" }]
```

---

### `reports-overtime.json`

Structure:

```json
[{ "month": "Jan", "public": 0, "private": 0 }]
```

---

### `public-reports.json`

Structure:

```json
{
  "pageSize": 0,
  "total": "string",
  "data": [
    {
      "reportId": "string",
      "dateSubmitted": "MMM DD, YYYY",
      "whoSubmitted": "string",
      "aiSystem": "string",
      "severity": "Critical | High | Medium | Low"
    }
  ]
}
```

---

## How to Update

1. Open the JSON file in `client/src/entities/dashboard/model/`
2. Edit values following the structures above
3. Ensure valid JSON (no trailing commas, quoted strings, correct types)
4. Save and refresh the dashboard page

---

## Notes

- Use three-letter months (Jan–Dec)
- Numbers in charts must be numbers (not strings)
- Icon paths (in `impact.json`) start with `/` and point to files in `client/public/`

### Common Issues and Solutions

**Issue: Data not updating**

- Clear your browser cache or do a hard refresh (Ctrl+Shift+R / Cmd+Shift+R)
- Restart the development server if you're using Next.js

**Issue: JSON syntax errors**

- Use a JSON validator (online tool or VS Code extension)
- Check for missing commas, extra commas, or unclosed brackets

**Issue: Type mismatches**

- Refer to `types.ts` in the same directory for TypeScript type definitions
- Ensure numeric fields use numbers (without quotes) and strings use quotes

---

## Type Definitions

For detailed TypeScript type definitions, see:

- `types.ts` in this directory

The types defined there ensure type safety when accessing this data in the application code.

---

## Related Files

- **Hooks:** `hooks/use-impact-by-numbers.ts`, `hooks/use-issue-categories.ts`, `hooks/use-recent-reports.ts`, `hooks/use-reports-overtime.ts`
- **Components:** Various dashboard widgets in `client/src/widgets/dashboard/`
- **Constants:** `constants.tsx` (chart colors, table columns, etc.)

---

## Notes

- These are **static data files** intended for development and MVP purposes
- In production, this data would typically come from an API or database
- All paths in `iconUrl` are relative to the `public` directory
- Date formats should be consistent across all entries
