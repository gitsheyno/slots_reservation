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

const allSlots = computed(() => {
  return [...props.slots];
});

const allUpdates = ref<Map<number, DataType>>(new Map());

watch(
  () => props.data,
  (newData) => {
    if (!newData) return;

    allUpdates.value.set(newData.id, newData);
  },
  { immediate: true }
);

const allSlotsWithUpdates = computed<SlotType[]>(() => {
  return allSlots.value.map((item) => {
    const update = allUpdates.value.get(item.id);
    if (update) {
      return {
        ...item,
        category: update.category as "red" | "green" | "yellow",
        capacity: {
          ...item.capacity,
          current_capacity: update.currentCapacity,
        },
      };
    }
    return item;
  });
});

const limitedSlots = computed(() => {
  if (!props.limit || props.limit === "all") {
    return allSlotsWithUpdates.value;
  }

  return allSlotsWithUpdates.value.filter(
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
