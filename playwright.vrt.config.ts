import { defineConfig } from "@playwright/test";

export default defineConfig({
	testDir: "./e2e",
	testMatch: "vrt.spec.ts",
	snapshotPathTemplate: "{testDir}/../vrt-baseline/slides/{arg}{ext}",
	updateSnapshots: "none",
	forbidOnly: !!process.env.CI,
	reporter: [["list"], ["html", { open: "never" }]],
});
