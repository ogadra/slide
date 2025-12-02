// https://developers.cloudflare.com/durable-objects/best-practices/websockets/
import { DurableObject } from "cloudflare:workers";

export interface Env {
	SLIDE_SYNC_CONNECTION_SERVER: DurableObjectNamespace<SlideSyncConnectionServer>;
}

export class SlideSyncConnectionServer extends DurableObject {
	constructor(
		public state: DurableObjectState,
		public env: Env,
	) {
		super(state, env);
	}

	async fetch(_request: Request): Promise<Response> {
		// biome-ignore lint/correctness/noUndeclaredVariables: Durable Object environment
		const webSocketPair = new WebSocketPair();
		const [client, server] = Object.values(webSocketPair);
		this.ctx.acceptWebSocket(server);

		return new Response(null, {
			status: 101,
			webSocket: client,
		});
	}

	async webSocketMessage(ws: WebSocket, message: ArrayBuffer | string) {
		this.state.getWebSockets().forEach((socket) => {
			if (socket !== ws) {
				socket.send(message);
			}
		});
	}

	async webSocketClose(
		ws: WebSocket,
		code: number,
		_reason: string,
		_wasClean: boolean,
	) {
		ws.close(code, "Durable Object is closing WebSocket");
	}
}
