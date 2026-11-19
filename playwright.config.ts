import { defineConfig, devices } from "@playwright/test";
import { manifest } from "./home/generated/manifest.ts";

const WORKER_PORT = 8787;
const SLIDEV_PORT = 3131;

const deck = manifest[0]?.slides[0]?.name;
if (deck === undefined) {
	throw new Error("the manifest holds no decks, so there is nothing to open");
}

export default defineConfig({
	testDir: "./e2e",
	forbidOnly: !!process.env.CI,
	use: {
		trace: "on-first-retry",
	},
	projects: [
		{
			name: "worker",
			testIgnore: "**/*.slidev.spec.ts",
			use: {
				...devices["Desktop Chrome"],
				baseURL: `http://127.0.0.1:${WORKER_PORT}`,
			},
		},
		{
			name: "slidev",
			testMatch: "**/*.slidev.spec.ts",
			use: {
				...devices["Desktop Chrome"],
				baseURL: `http://localhost:${SLIDEV_PORT}`,
			},
		},
	],
	webServer: [
		// The same Worker the deploy ships, reading the decks out of the local R2 that `pnpm run e2e:fixture` seeded.
		{
			command: `pnpm exec wrangler dev --env dev --port ${WORKER_PORT}`,
			url: `http://127.0.0.1:${WORKER_PORT}`,
			reuseExistingServer: !process.env.CI,
			timeout: 120_000,
		},
		// The dev server a deck is written against, which bundles the client differently from a build.
		{
			command: `pnpm --filter ${deck} exec slidev --port ${SLIDEV_PORT}`,
			// slidev ignores --bind without --remote and may listen on ::1 only, so 127.0.0.1 would not reach it.
			url: `http://localhost:${SLIDEV_PORT}`,
			reuseExistingServer: !process.env.CI,
			timeout: 120_000,
		},
	],
});
