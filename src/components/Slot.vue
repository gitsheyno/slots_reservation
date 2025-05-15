<script setup lang="ts">
/**
 * Renders each slot and updates the style and Progress based on incomes.
 */
import CapacityWrapper from "./CapacityWrapper.vue";
import { computed } from "vue";
import { format } from "date-fns";
import TimeSVG from "./svgs/TimeSVG.vue";
import LocSVG from "./svgs/LocSVG.vue";
import UserSVG from "./svgs/UserSVG.vue";
import { type SlotType } from "../types";
import { handleColor } from "../utilities/handleColor";

const props = defineProps<{
  slot: SlotType;
}>();

const handleFormatTimeRange = (startTime: string, endTime: string): string => {
  const start = new Date(startTime);
  const end = new Date(endTime);

  const formatedTime = `${format(start, "h:mm a")} - ${format(end, "h:mm a")}`;
  return formatedTime;
};

const handleBorderStyle = computed(() => {
  if (props.slot.category === "yellow") {
    return `border-amber-200`;
  } else if (props.slot.category === "red") {
    return `border-red-500`;
  } else {
    return `border-emerald-200`;
  }
});

const handleCategoryStyle = computed(() => {
  return handleColor(props.slot.category);
});
</script>

<template>
  <div
    class="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl border-2"
    :class="handleBorderStyle"
  >
    <div class="flex items-center justify-between p-4 border-b border-gray-100">
      <div class="flex items-center">
        <div
          class="px-3 py-1 text-sm bg-amber-400 rounded-full font-medium text-white"
          :class="handleCategoryStyle"
        >
          {{ props.slot.id }}
        </div>
      </div>
      <div class="font-medium text-gray-900 flex items-center gap-2">
        <TimeSVG />
        {{ handleFormatTimeRange(props.slot.start_time, props.slot.end_time) }}
      </div>
    </div>
    <div class="p-4">
      <div class="flex items-center mb-2">
        <LocSVG />
        <span class="text-gray-700">{{ props.slot.location }}</span>
      </div>
      <div class="flex items-center mb-3">
        <UserSVG />
        <span>{{ props.slot.instructor }}</span>
      </div>
      <CapacityWrapper
        :capacity="props.slot.capacity.current_capacity"
        :maxCapacity="props.slot.capacity.max_capacity"
        :currentCategory="props.slot.category"
      />
    </div>
  </div>
</template>
