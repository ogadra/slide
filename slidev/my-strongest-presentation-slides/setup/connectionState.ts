import { ref } from "vue";

export const ConnectionStatusEnum = {
	Connected: "Connected",
	Connecting: "Connecting",
	Disconnected: "Disconnected",
};

type ConnectionState =
	(typeof ConnectionStatusEnum)[keyof typeof ConnectionStatusEnum];

export const connectionStatus = ref<ConnectionState>(
	ConnectionStatusEnum.Connecting,
);

// WebSocketインスタンスへの参照
let wsInstance: WebSocket | null = null;

export const setWsInstance = (ws: WebSocket | null) => {
	wsInstance = ws;
};

export const getWsInstance = () => wsInstance;

export const changeConnectionState = (newState: ConnectionState) => {
	connectionStatus.value = newState;
};
