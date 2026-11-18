import { defineConfig, devices } from "@playwright/test";

const PORT = 8788;

export default defineConfig({
	testDir: "./e2e",
	testMatch: "vrt.spec.ts",
	forbidOnly: !!process.env.CI,
	use: {
		baseURL: `http://127.0.0.1:${PORT}`,
		trace: "on-first-retry",
	},
	projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
	webServer: {
		command: `pnpm exec wrangler dev --env dev --port ${PORT}`,
		url: `http://127.0.0.1:${PORT}`,
		reuseExistingServer: !process.env.CI,
		timeout: 120_000,
	},
});
