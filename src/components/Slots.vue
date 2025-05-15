<script setup lang="ts">
/**
 * Displays slots, group by date
 * Fetches slot data
 * Recieves realtime update for slots
 */
import { useGetSlots } from "../composables/useFetchSlots";
import { useEventSource } from "../composables/useEventSource";
import { format } from "date-fns";
import SlotWrapper from "./SlotWrapper.vue";
import DateSVG from "./svgs/DateSVG.vue";
import { SSEUrl } from "../constants/APIS";
import Spinner from "./Spinner.vue";

const { data: slots, loading } = useGetSlots();

const { data } = useEventSource(SSEUrl, {
  onOpen: (event: Event) => console.log("SSE connection established", event),
  onError: (event: Event) => console.error("SSE connection error:", event),
  autoReconnect: true,
  reconnectDelay: 5000,
});

const handleFormaDate = (dateSring: string) => {
  const date = new Date(dateSring);
  return format(date, "EEEE, MMMM d, yyyy");
};
</script>

<template>
  <div v-if="loading" class="flex justify-center items-center min-h-[200px]">
    <Spinner />
  </div>
  <div v-else>
    <div v-for="(sortedSlots, date) in slots" :key="date" class="mb-10">
      <h2 class="text-2xl font-semibold mb-4 text-indigo-800 flex items-center">
        <DateSVG />
        {{ handleFormaDate(date) }}
      </h2>
      <SlotWrapper :slots="sortedSlots" :data="data" />
    </div>
  </div>
</template>
