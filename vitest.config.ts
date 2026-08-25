import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		// Each project brings its own runtime, so they cannot share one config.
		projects: ["./home/vitest.config.ts"],
	},
});
