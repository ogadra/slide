import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { expect, test } from "@playwright/test";

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const slidesDir = join(repoRoot, "dist", "slides");

if (!existsSync(join(repoRoot, "vrt-baseline", "slides"))) {
	throw new Error(
		"vrt-baseline/slides is missing. Copy slides/*/slides-export/*.png from the prd bucket there first",
	);
}

const decks = existsSync(slidesDir)
	? readdirSync(slidesDir, { withFileTypes: true })
			.filter((entry) => entry.isDirectory())
			.map((entry) => entry.name)
			.filter((deck) => existsSync(join(slidesDir, deck, "slides-export")))
	: [];

if (decks.length === 0) {
	throw new Error(
		"no slides-export under dist/slides. Run `pnpm -r run build:png` first",
	);
}

for (const deck of decks) {
	const exportDir = join(slidesDir, deck, "slides-export");
	const pages = readdirSync(exportDir)
		.filter((file) => file.endsWith(".png"))
		.sort((a, b) => Number.parseInt(a, 10) - Number.parseInt(b, 10));

	test.describe(deck, () => {
		for (const page of pages) {
			test(`slide ${page}`, () => {
				expect(readFileSync(join(exportDir, page))).toMatchSnapshot([
					deck,
					"slides-export",
					page,
				]);
			});
		}
	});
}
