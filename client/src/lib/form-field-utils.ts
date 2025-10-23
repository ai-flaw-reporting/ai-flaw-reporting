/**
 * Utility functions for safe form field array operations
 */

/**
 * Safely gets an array from a form field value, defaulting to empty array if not an array
 */
export function getSafeArray<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}

/**
 * Safely checks if an array contains a specific value
 */
export function safeIncludes<T>(value: unknown, item: T): boolean {
  return Array.isArray(value) && value.includes(item);
}

/**
 * Creates a handler for checkbox array fields that safely manages array operations
 */
export function createArrayCheckboxHandler<T>(
  fieldValue: unknown,
  onChange: (value: T[]) => void,
) {
  return (checked: boolean, itemValue: T) => {
    const currentValues = getSafeArray<T>(fieldValue);

    if (checked) {
      // Add item if not already present
      if (!currentValues.includes(itemValue)) {
        onChange([...currentValues, itemValue]);
      }
    } else {
      // Remove item
      onChange(currentValues.filter((v: T) => v !== itemValue));
    }
  };
}

/**
 * Creates a handler for select array fields that safely manages array operations
 */
export function createArraySelectHandler<T>(
  fieldValue: unknown,
  onChange: (value: T[]) => void,
) {
  return (itemValue: T) => {
    const currentValues = getSafeArray<T>(fieldValue);

    // Add item if not already present
    if (!currentValues.includes(itemValue)) {
      onChange([...currentValues, itemValue]);
    }
  };
}

/**
 * Creates a handler for removing items from array fields
 */
export function createArrayRemoveHandler<T>(
  fieldValue: unknown,
  onChange: (value: T[]) => void,
) {
  return (itemValue: T) => {
    const currentValues = getSafeArray<T>(fieldValue);
    onChange(currentValues.filter((v: T) => v !== itemValue));
  };
}
