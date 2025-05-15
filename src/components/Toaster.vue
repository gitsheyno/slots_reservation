<script setup lang="ts">
import { useToasterStore } from "../store/useToasterStore";
import { type ToastStatus } from "../types";
const toastStore = useToasterStore();

const toastColor: Record<ToastStatus, string> = {
  red: "bg-red-500 border-red-600",
  yellow: "bg-yellow-500 border-yellow-600",
  green: "bg-green-500 border-green-600",
};
</script>

<template>
  <Teleport to="body">
    <TransitionGroup
      tag="ul"
      v-if="toastStore.toasts.length"
      class="fixed top-4 right-4 z-50 flex flex-col gap-3 w-80 max-w-full pointer-events-none"
      enter-active-class="transition ease-out duration-300"
      enter-from-class="transform opacity-0 translate-x-8"
      enter-to-class="transform opacity-100 translate-x-0"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="transform opacity-100 translate-y-0"
      leave-to-class="transform opacity-0 -translate-y-4"
    >
      <li
        v-for="toast in toastStore.toasts"
        :key="toast.id"
        :class="[
          'rounded-lg shadow-xl py-3 px-4 text-white',
          'flex items-center',
          'border-l-4',
          toastColor[toast.status],
          'backdrop-blur-sm bg-opacity-95',
        ]"
      >
        <span class="text-sm font-medium">
          {{ toast.text }}
        </span>
      </li>
    </TransitionGroup>
  </Teleport>
</template>
