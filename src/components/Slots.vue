<script setup lang="ts">
/**
 * Displays slots, group by date
 * Fetches slot data
 * Recieves realtime update for slots
 */
import { useGetSlots } from "../composables/useFetchSlots";
import { useEventSource } from "../composables/useEventSource";
import { format } from "date-fns";
import { computed, ref } from "vue";
import SlotWrapper from "./SlotWrapper.vue";
import DateSVG from "./svgs/DateSVG.vue";
import { SSEUrl } from "../constants/APIS";
import Spinner from "./Spinner.vue";
import { useToasterStore } from "../store/useToasterStore";
import Input from "./Input.vue";
import Dropdown from "./Dropdown.vue";
import { type DropdownItems } from "../types";
import { categoryOptions } from "../constants/categoryOptions";
import { VPagination } from "vuetify/components";

const searchTerm = ref("");
const limitOnCategory = ref<DropdownItems>("all");
const currentPage = ref(1);

const toastStore = useToasterStore();
const { data: slots, loading } = useGetSlots();

const handleSSEMessage = (event: MessageEvent) => {
  const notification = JSON.parse(event.data);
  toastStore.update(
    {
      text: `slot number : ${notification.id} is updated `,
    },
    notification.category
  );
};

const { data } = useEventSource(SSEUrl, {
  onMessage: handleSSEMessage,
  onOpen: (event: Event) => console.log("SSE connection established", event),
  onError: (event: Event) => console.error("SSE connection error:", event),
  autoReconnect: true,
  reconnectDelay: 5000,
});

const handleFormaDate = (dateSring: string) => {
  const date = new Date(dateSring);
  return format(date, "EEEE, MMMM d, yyyy");
};

const allPagesLength = computed(() => {
  if (!slots.value) return 0;
  return Object.entries(slots.value).length;
});

const visibleSlots = computed(() => {
  if (!slots.value) return [];
  const index = currentPage.value - 1;

  return Object.entries(slots.value)[index] || [];
});

const HandleNextPage = () => {
  if (currentPage.value < allPagesLength.value) {
    currentPage.value++;
  }
};

const HandlePrevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};
</script>

<template>
  <div v-if="loading" class="flex justify-center items-center min-h-[200px]">
    <Spinner />
  </div>
  <div v-else>
    <div class="mt-12 md:mt-0 mb-6 relative">
      <div
        class="w-full md:w-[50%] flex flex-col items-center gap-4 md:flex-row"
      >
        <Input v-model="searchTerm" />
        <div class="w-[100%] md:w-[170px]">
          <Dropdown
            v-model="limitOnCategory"
            :options="categoryOptions"
            placeholder="Filter by category"
          />
        </div>
      </div>
    </div>
    <div v-if="visibleSlots" class="flex-1 min-h-0 mb-10">
      <h2 class="text-2xl font-semibold mb-4 text-indigo-800 flex items-center">
        <DateSVG />
        {{ handleFormaDate(visibleSlots[0]) }}
        <span class="text-sm font-normal text-gray-500 ml-2"
          >(Page {{ currentPage }} of {{ allPagesLength }})</span
        >
      </h2>
      <SlotWrapper
        :slots="visibleSlots[1]"
        :data="data"
        :searchTerm="searchTerm"
        :limit="limitOnCategory"
      />
    </div>
    <div class="flex items-center justify-center">
      <button
        @click="HandlePrevPage"
        :disabled="currentPage === 1"
        class="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Previous
      </button>

      <v-pagination
        v-model="currentPage"
        :length="allPagesLength"
        :total-visible="7"
        color="indigo-darken-3"
        class="my-2"
      ></v-pagination>

      <button
        @click="HandleNextPage"
        :disabled="currentPage === allPagesLength"
        class="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Next
      </button>
    </div>
  </div>
</template>
