export const isValidDate = (
  date: string | Date | undefined,
): date is string | Date => {
  return date != null && !isNaN(new Date(date).getTime());
};

/**
 * Compares two dates ignoring the time component (compares at midnight).
 * @param date1 First date to compare
 * @param date2 Second date to compare
 * @returns Negative if date1 < date2, 0 if equal, positive if date1 > date2
 */
const compareDatesIgnoringTime = (date1: Date, date2: Date): number => {
  const d1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
  const d2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
  return d1.getTime() - d2.getTime();
};

/**
 * Determines if a date should be disabled in the disclosure date picker
 * based on the public disclosure intent.
 *
 * @param date - The date to check
 * @param publicDisclosureIntent - The selected public disclosure intent value
 * @returns true if the date should be disabled, false otherwise
 */
export const isDisclosureDateDisabled = (
  date: Date,
  publicDisclosureIntent: string | undefined,
): boolean => {
  const today = new Date();
  const minDate = new Date("1900-01-01");

  // Always disable dates before the minimum date
  if (compareDatesIgnoringTime(date, minDate) < 0) {
    return true;
  }

  // When "Plan To Publicly Disclose" (YES) is selected, restrict to today and future dates only
  if (publicDisclosureIntent === "yes") {
    // Disable past dates only (allow today and future dates)
    return compareDatesIgnoringTime(date, today) < 0;
  }

  // When "Already publicly disclosed" (ALREADY) is selected, allow past dates only
  if (publicDisclosureIntent === "already") {
    // Disable future dates (only allow today and past dates)
    return compareDatesIgnoringTime(date, today) > 0;
  }

  // Default: allow dates from 1900 to today (disable future dates)
  return compareDatesIgnoringTime(date, today) > 0;
};
