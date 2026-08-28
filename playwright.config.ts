import { defineConfig, devices } from "@playwright/test";

const PORT = 8787;

export default defineConfig({
	testDir: "./e2e",
	forbidOnly: !!process.env.CI,
	use: {
		baseURL: `http://127.0.0.1:${PORT}`,
		trace: "on-first-retry",
	},
	projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
	// The same Worker the deploy ships, reading the decks out of the local R2 that
	// `pnpm run e2e:fixture` seeded.
	webServer: {
		command: `pnpm exec wrangler dev --env dev --port ${PORT}`,
		url: `http://127.0.0.1:${PORT}`,
		reuseExistingServer: !process.env.CI,
		timeout: 120_000,
	},
});
