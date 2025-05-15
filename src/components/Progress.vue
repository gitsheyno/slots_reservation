<script setup lang="ts">
/**
 * Shows the Capacity as Progress
 * Updates style based on new Incomes
 */
import { computed } from "vue";
import { handleColor } from "../utilities/handleColor";
const props = defineProps<{
  percentage: number;
  currentCategory: "red" | "green" | "yellow";
}>();

const handleCapacityBackground = computed(() => {
  return handleColor(props.currentCategory);
});
</script>

<template>
  <div
    class="h-full rounded-full transition-all duration-500 ease-out"
    :style="`width: ${percentage}%`"
    :class="handleCapacityBackground"
  ></div>
</template>
