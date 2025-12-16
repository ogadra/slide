// 許可されたコマンドの定義

// 名前付きコマンド定数（モックハンドラー用）
export const AllowCommandStrings = {
	installHonoCli: "npm install -g @hono/cli",
	requestExample: "hono request -P / example-1/index.ts",
	startServer: 'hono serve example-2/index.ts \\\n    --use "logger()"',
	killServer: "lsof -ti:7070 | xargs kill -9",
} as const;

export type AllowCommandKey = keyof typeof AllowCommandStrings;

// handler.ts用の配列形式
export const AllowCommands: Record<string, string[]> = {
	bash: [
		AllowCommandStrings.installHonoCli,
		AllowCommandStrings.requestExample,
		"hono serve example-2/index.ts",
		AllowCommandStrings.killServer,
		`hono serve example-2/index.ts \
  --use "logger()"`,
	],
	TypeScript: [
		`import { Hono } from 'hono'
const app = new Hono()
app.get('/', (c) => c.text('Hello World!'))
export default app`,

		`import { Hono } from 'hono';
import { Page } from './page';
const app = new Hono<{
  Variables: { count: number; };
}>();
let counter = 0;
app.get('/', (c) => {
  counter++;
  c.set('count', counter);
  return Page(c);
});
export default app;`,
	],
	kill: [""],
	start: [""],
} as const;
