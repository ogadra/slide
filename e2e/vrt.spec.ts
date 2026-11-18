import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { expect, test } from "@playwright/test";

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "..");

test("the homepage renders as captured", async ({ page }) => {
	await page.goto("/");
	await page.waitForLoadState("networkidle");
	await page.evaluate(() => document.fonts.ready.then(() => undefined));

	await expect(page).toHaveScreenshot("homepage.png", {
		animations: "disabled",
		fullPage: true,
	});
});

const slidesDir = join(repoRoot, "dist", "slides");
if (!existsSync(slidesDir)) {
	throw new Error(
		"dist/slides is missing, so there is nothing to compare. Run `pnpm run vrt:fixture` first",
	);
}

let pngCount = 0;
for (const entry of readdirSync(slidesDir, { withFileTypes: true })) {
	if (!entry.isDirectory()) continue;

	const exportDir = join(slidesDir, entry.name, "slides-export");
	if (!existsSync(exportDir)) continue;

	const pages = readdirSync(exportDir)
		.filter((file) => file.endsWith(".png"))
		.sort((a, b) => Number.parseInt(a, 10) - Number.parseInt(b, 10));

	test.describe(entry.name, () => {
		for (const page of pages) {
			pngCount++;
			test(`slide ${page}`, async () => {
				await expect(readFileSync(join(exportDir, page))).toMatchSnapshot(
					join("slides", entry.name, page),
				);
			});
		}
	});
}
if (pngCount === 0) {
	throw new Error(
		"no slides-export PNGs under dist/slides. Run `pnpm run vrt:fixture` first",
	);
}
