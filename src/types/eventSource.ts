export type EventSourceOptionsType = {
  onMessage?: (event: MessageEvent) => void;
  onOpen?: (event: Event) => void;
  onError?: (event: Event) => void;
  autoReconnect?: boolean;
  reconnectDelay?: number;
};
