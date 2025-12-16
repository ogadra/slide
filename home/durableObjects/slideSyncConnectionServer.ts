// https://developers.cloudflare.com/durable-objects/best-practices/websockets/
import { DurableObject } from "cloudflare:workers";
import { getSessionTokenFromRequest, verifySessionToken } from "../utils/auth";

export type Env = {
	SLIDE_SYNC_CONNECTION_SERVER: DurableObjectNamespace<SlideSyncConnectionServer>;
	SESSION_KV: KVNamespace;
};

const Role = {
	PRESENTER: "presenter",
	VIEWER: "viewer",
} as const;

type RoleType = (typeof Role)[keyof typeof Role];

export class SlideSyncConnectionServer extends DurableObject {
	constructor(
		public state: DurableObjectState,
		public env: Env,
	) {
		super(state, env);
	}

	fetch = async (request: Request): Promise<Response> => {
		const token = getSessionTokenFromRequest(request);
		const isPresenter = await verifySessionToken(token, this.env.SESSION_KV);

		// biome-ignore lint/correctness/noUndeclaredVariables: Durable Object environment
		const webSocketPair = new WebSocketPair();
		const [client, server] = Object.values(webSocketPair);
		this.ctx.acceptWebSocket(server, [
			isPresenter ? Role.PRESENTER : Role.VIEWER,
		]);

		return new Response(null, {
			status: 101,
			webSocket: client,
		});
	};

	private checkUserRole = (role: RoleType, socket: WebSocket) => {
		return this.state.getWebSockets(role).includes(socket);
	};

	webSocketMessage = async (ws: WebSocket, message: ArrayBuffer | string) => {
		if (this.checkUserRole(Role.VIEWER, ws)) {
			// Viewers are not allowed to send messages
			return;
		}
		this.state.getWebSockets().forEach((socket) => {
			if (socket !== ws) {
				socket.send(message);
			}
		});
	};

	webSocketClose = async (
		ws: WebSocket,
		code: number,
		_reason: string,
		_wasClean: boolean,
	) => {
		ws.close(code, "Durable Object is closing WebSocket");
	};
}
