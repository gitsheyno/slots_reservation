import { onMounted, onUnmounted, ref } from "vue";
import { type EventSourceOptionsType } from "../types";

/**
 * establish one directional connectin to server to get the new updates
 * tries to reconnect after a certain problem
 */
export const useEventSource = (
  url: string,
  options: EventSourceOptionsType
) => {
  const data = ref<{
    id: number;
    currentCapacity: number;
    category: string;
  } | null>(null);
  const eventSource = ref<EventSource | null>(null);
  const isConnected = ref(false);
  const error = ref<Event | null>(null);

  const { onMessage, onOpen, onError, autoReconnect, reconnectDelay } = options;

  let reconnectTimeout: number | null = null;

  const connect = () => {
    if (eventSource.value) {
      close();
    }

    eventSource.value = new EventSource(url);

    eventSource.value.onmessage = (event) => {
      try {
        data.value = JSON.parse(event.data);
      } catch {
        data.value = event.data;
      }

      if (onMessage) onMessage(event);
    };

    eventSource.value.onopen = (event) => {
      isConnected.value = true;
      error.value = null;

      if (onOpen) {
        onOpen(event);
      }
    };

    eventSource.value.onerror = (event: Event) => {
      error.value = event;
      isConnected.value = false;

      if (onError) onError(event);

      if (autoReconnect) {
        close();

        reconnectTimeout = window.setTimeout(connect, reconnectDelay);
      }
    };
  };

  const close = () => {
    if (eventSource.value) {
      eventSource.value.close();
      eventSource.value = null;
    }

    isConnected.value = false;

    if (reconnectTimeout !== null) {
      clearTimeout(reconnectTimeout);
      reconnectTimeout = null;
    }
  };

  onMounted(() => {
    connect();
  });

  onUnmounted(() => {
    close();
  });

  return {
    data,
  };
};
