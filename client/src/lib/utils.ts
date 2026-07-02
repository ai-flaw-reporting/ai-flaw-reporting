import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function humanizeKey(key: string): string {
  // Insert space before capital letters and numbers, then title-case words.
  const withSpaces = key
    // handle snake_case or kebab-case too
    .replace(/[-_]+/g, " ")
    // split camelCase / PascalCase boundaries
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    // split letter-number boundaries (e.g., v2 -> v 2)
    .replace(/([A-Za-z])([0-9])/g, "$1 $2")
    .replace(/([0-9])([A-Za-z])/g, "$1 $2")
    .trim();

  // Title-case while preserving common all-caps acronyms
  return withSpaces
    .split(/\s+/)
    .map((word) => {
      // keep common acronyms uppercased
      if (/^(id|api|url|ip|ui|cpu|gpu|ssl|tls)$/i.test(word)) {
        return word.toUpperCase();
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
}

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
};
