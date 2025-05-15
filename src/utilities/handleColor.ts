/**
 *
 * Handles color based on category
 */
export const handleColor = (category: string) => {
  if (category === "yellow") {
    return `bg-amber-200`;
  } else if (category === "red") {
    return `bg-red-500`;
  } else {
    return `bg-emerald-200`;
  }
};
