import { ref } from "vue";

export const ConnectionStatusEnum = {
	Connected: "Connected",
	Connecting: "Connecting",
	Disconnected: "Disconnected",
};

export const connectionStatus = ref<ConnectionState>(
	ConnectionStatusEnum.Connecting,
);

type ConnectionState =
	(typeof ConnectionStatusEnum)[keyof typeof ConnectionStatusEnum];

// WebSocketインスタンスへの参照
let wsInstance: WebSocket | null = null;

export const setWsInstance = (ws: WebSocket | null) => {
	wsInstance = ws;
};

export const getWsInstance = () => wsInstance;

export const changeConnectionState = (newState: ConnectionState) => {
	connectionStatus.value = newState;
};
