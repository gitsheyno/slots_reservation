import { type SlotType } from "./index";

export type ToastStatus = Pick<SlotType, "category">["category"];
export type Toast = {
  text: string;
  status: ToastStatus;
  id: number;
};
export type ToastPlayload = { timeout?: number; text: string };
