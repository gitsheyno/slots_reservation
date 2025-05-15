/**
 *
 * Handles color based on category
 */
export const handleColor = (category: "red" | "green" | "yellow") => {
  const check: Record<"red" | "green" | "yellow", string> = {
    yellow: `bg-amber-200`,
    green: `bg-emerald-200`,
    red: `bg-red-500`,
  };

  return check[category];
};
