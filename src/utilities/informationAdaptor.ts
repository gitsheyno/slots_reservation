import { extraSlotDetails } from "../constants/slotDetails";

import { type SlotType } from "../types";

/**
 * It injects adtional information like instructor and location to slots
 */
export const enrichSlots = (slots: SlotType[]) => {
  return slots?.map((slot) => {
    const extra = extraSlotDetails.find((e) => e.id === slot.id);
    return {
      ...slot,
      ...extra,
    };
  });
};
