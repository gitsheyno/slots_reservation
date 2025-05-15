<script setup lang="ts">
/**
 * Acts as a wrapper for Slots and render each Slot
 * Applies update to Slots
 */
import { ref, watch } from "vue";
import Slot from "./Slot.vue";
import { type SlotType, type DataType } from "../types";

const props = defineProps<{
  slots: SlotType[];
  data?: DataType | null;
  searchTerm?: string;
  limit?: "yellow" | "red" | "green" | "all" | null;
}>();

const allSlots = ref<SlotType[]>([...props.slots]);

watch(
  () => props.data,
  (newData) => {
    if (!newData) return;

    allSlots.value = allSlots.value.map((item) => {
      if (item.id === newData.id) {
        return {
          ...item,
          category: newData.category,
          capacity: {
            ...item.capacity,
            current_capacity: newData.currentCapacity,
          },
        };
      }
      return item;
    });
  },
  { immediate: true }
);
</script>

<template>
  <div
    v-if="allSlots.length"
    class="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
  >
    <div v-for="slot in allSlots" :key="slot.id">
      <Slot :slot="slot" />
    </div>
  </div>
  <div v-else>No slots match your search</div>
</template>
