export const isValidDate = (
  date: string | Date | undefined,
): date is string | Date => {
  return date != null && !isNaN(new Date(date).getTime());
};
