import { defineStore } from "pinia";
import { type Toast, type ToastStatus, type ToastPlayload } from "../types";

const createToast = (text: string, staus: ToastStatus): Toast => ({
  text,
  status: staus,
  id: Math.floor(Math.random() * 1000),
});

const defaultTimeout: number = 2500;

export const useToasterStore = defineStore("toaster", {
  state: (): { toasts: Toast[] } => ({
    toasts: [],
  }),
  actions: {
    updateState(payload: ToastPlayload, status: ToastStatus) {
      const { text, timeout } = payload;

      const toast = createToast(text, status);

      this.toasts.push(toast);

      setTimeout(() => {
        this.toasts = this.toasts.filter((t) => t.id !== toast.id);
      }, timeout || defaultTimeout);
    },
    update(payload: ToastPlayload, category: string) {
      this.updateState(payload, category as ToastStatus);
    },
  },
});
