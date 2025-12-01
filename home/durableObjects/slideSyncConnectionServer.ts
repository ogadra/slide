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


  async fetch(request: Request): Promise<Response> {
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
    reason: string,
    wasClean: boolean,
  ) {
    ws.close(code, "Durable Object is closing WebSocket");
  }
}
