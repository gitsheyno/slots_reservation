import { computed } from "vue";
import { type SlotType } from "../types";

/**
 * It groups slots based on date and time
 */
export const grouping = (slots: SlotType[]) => {
  const groupedTimeSlots = computed(() => {
    const groups: Record<string, SlotType[]> = {};
    slots.forEach((slot) => {
      const date = slot.start_time.split("T")[0];
      if (!groups[date]) {
        groups[date] = [];
      }

      groups[date].push(slot);
    });
    Object.keys(groups).forEach((date) => {
      groups[date].sort(
        (a, b) =>
          new Date(a.start_time).getTime() - new Date(b.start_time).getTime()
      );
    });

    return groups;
  });

  return groupedTimeSlots;
};
