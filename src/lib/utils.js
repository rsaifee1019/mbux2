import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const transToGroupOption = (options, groupBy) => {
  const groupedOptions = options.reduce((acc, option) => {
    const groupKey = option[groupBy];
    if (!acc[groupKey]) {
      acc[groupKey] = [];
    }
    acc[groupKey].push(option);
    return acc;
  }, {});
  return groupedOptions;
};

