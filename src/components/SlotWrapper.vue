<script setup lang="ts">
/**
 * Acts as a wrapper for Slots and render each Slot
 * Applies update to Slots
 * Applies SearchTerm to Slots
 */
import { ref, watch, computed } from "vue";
import Slot from "./Slot.vue";
import { type SlotType, type DataType, type DropdownItems } from "../types";

const props = defineProps<{
  slots: SlotType[];
  data?: DataType | null;
  searchTerm?: string;
  limit?: DropdownItems;
}>();

const allSlots = ref<SlotType[]>([...props.slots]);

const limitedSlots = computed(() => {
  if (!props.limit || props.limit === "all") {
    return allSlots.value;
  }

  return allSlots.value.filter(
    (item) => item.category === props.limit?.toLowerCase()
  );
});

const filteredSlots = computed(() => {
  if (!props.searchTerm) {
    return limitedSlots.value;
  }

  const term = props.searchTerm.toLowerCase();
  return limitedSlots.value.filter(
    (item) =>
      item.category?.toLowerCase().includes(term) ||
      item.instructor?.toLowerCase().includes(term) ||
      item.location?.toLowerCase().includes(term)
  );
});

watch(
  () => props.data,
  (newData) => {
    if (!newData) return;

    allSlots.value = allSlots.value.map((item) => {
      if (item.id === newData.id) {
        return {
          ...item,
          category: newData.category as "red" | "green" | "yellow",
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
    v-if="filteredSlots.length"
    class="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
  >
    <div v-for="slot in filteredSlots" :key="slot.id">
      <Slot :slot="slot" />
    </div>
  </div>
  <div v-else>No slots match your search</div>
</template>
