import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		projects: [
			// The build and deploy scripts. Nothing here touches a Worker runtime, so
			// plain Node is both enough and faster.
			{
				test: {
					name: "scripts",
					environment: "node",
					include: [
						"scripts/**/*.test.ts",
						".github/scripts/**/*.test.ts",
						"home/scripts/**/*.test.ts",
					],
				},
			},
			// The Worker, on workerd.
			"./home/vitest.config.ts",
		],
	},
});
