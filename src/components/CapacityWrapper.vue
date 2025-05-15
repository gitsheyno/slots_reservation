<script setup lang="ts">
/**
 * Acts as wrapper for the Progress
 * Shows current information about max-current Capacity
 */
import Progress from "./Progress.vue";
import { computed } from "vue";

const props = defineProps<{
  capacity: number;
  maxCapacity: number;
  currentCategory: string;
}>();

const handleCapacityProgress = computed(() => {
  if (!props.capacity) {
    return 0;
  }
  const percentage = ((props.capacity / props.maxCapacity) * 100).toFixed(2);

  return Number(percentage);
});
</script>
<template>
  <div class="mt-4">
    <div class="flex items-center justify-between mb-2">
      <span class="text-sm font-semibold text-gray-600">Capacity</span>
      <span class="text-sm font-bold bg-gray-100 px-2 py-1 rounded-md">
        {{ props?.capacity }} /
        {{ props?.maxCapacity }}
      </span>
    </div>
    <div class="w-full bg-gray-100 rounded-full h-3">
      <Progress
        :percentage="handleCapacityProgress as number"
        :currentCategory="currentCategory"
      />
    </div>
  </div>
</template>
