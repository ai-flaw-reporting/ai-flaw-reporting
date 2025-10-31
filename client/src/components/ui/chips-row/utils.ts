export const itemMatchesInput = (
  item: { name: string; associatedTerm?: string },
  searchValue: string,
): boolean => {
  const lowerSearch = searchValue.toLowerCase();
  return (
    item.name.toLowerCase().includes(lowerSearch) ||
    lowerSearch.includes(item.associatedTerm?.toLowerCase() ?? "")
  );
};

export const getItemValue = (item: {
  name: string;
  associatedTerm?: string;
}): string => {
  return item.associatedTerm ?? item.name;
};

export const isItemSelected = (
  item: { name: string; associatedTerm?: string },
  selectedValues: string[],
): boolean => {
  return selectedValues.includes(getItemValue(item));
};
