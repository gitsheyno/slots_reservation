import { type SlotType } from "./index";

export type DataType = Pick<SlotType, "id" | "category"> & {
  currentCapacity: SlotType["capacity"]["current_capacity"];
};
