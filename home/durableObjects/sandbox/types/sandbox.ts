// サーバーログのサブスクライバー
export interface ServerLogSubscriber {
	processId: string;
	writer: WritableStreamDefaultWriter;
}

// 実行可能なタイプの定義
export const AllowExecute = {
	bash: "bash",
	TypeScript: "TypeScript",
	kill: "kill",
	start: "start",
} as const;

export type AllowExecuteType = (typeof AllowExecute)[keyof typeof AllowExecute];
