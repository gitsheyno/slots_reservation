<script setup lang="ts">
import { useGetSlots } from "../composables/useFetchSlots";
import { useEventSource } from "../composables/useEventSource";

const { data: slots } = useGetSlots();

const { data } = useEventSource(
  "https://timeslot-stream-ha2tva3niq-ey.a.run.app/sse",
  {
    onOpen: (event: Event) => console.log("SSE connection established", event),
    onError: (event: Event) => console.error("SSE connection error:", event),
    autoReconnect: true,
    reconnectDelay: 5000,
  }
);
</script>

<template>{{ data }}{{ slots }}</template>
