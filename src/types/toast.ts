export type ToastStatus = "red" | "yellow" | "green";
export type Toast = {
  text: string;
  status: ToastStatus;
  id: number;
};
export type ToastPlayload = { timeout?: number; text: string };
