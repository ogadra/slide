import { cloudflareTest } from "@cloudflare/vitest-pool-workers";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [
		cloudflareTest({
			// The root config is what ships, so the tests get production's entry point and bindings.
			wrangler: { configPath: "../wrangler.jsonc" },
		}),
	],
	test: {
		name: "worker",
		include: ["tests/**/*.test.ts"],
	},
});
