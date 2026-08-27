import { expect, test } from "@playwright/test";
import { manifest } from "../home/generated/manifest.ts";

// The same entry e2eFixture builds, so the deck opened here is the deck that exists.
const deck = manifest[0]?.slides[0];
if (deck === undefined) {
	throw new Error("the manifest holds no decks, so there is nothing to open");
}

const openDeck = async (page: import("@playwright/test").Page) => {
	await page.goto("/");
	const [opened] = await Promise.all([
		page.context().waitForEvent("page"),
		page.getByRole("link", { name: deck.title }).click(),
	]);
	return opened;
};

test("the homepage shows the newest deck with a thumbnail that loads", async ({
	page,
}) => {
	await page.goto("/");

	await expect(
		page.getByRole("heading", { name: "ogadra's Slide Archive" }),
	).toBeVisible();

	const link = page.getByRole("link", { name: deck.title });
	await expect(link).toBeVisible();

	// A missing export still renders an <img>, so the decoded size is what proves it.
	const width = await link
		.locator("img")
		.evaluate((img: HTMLImageElement) => img.naturalWidth);
	expect(width).toBeGreaterThan(0);
});

test("a deck opens from the homepage", async ({ page }) => {
	const opened = await openDeck(page);

	await expect(opened).toHaveURL(new RegExp(`/${deck.name}/?$`));
});

// Shift skips the click animations, so this advances a slide whatever the deck holds.
test("the slides advance", async ({ page }) => {
	const opened = await openDeck(page);
	await opened.locator("#slide-container").waitFor();

	await opened.keyboard.press("Shift+ArrowRight");

	await expect(opened).toHaveURL(new RegExp(`/${deck.name}/2$`));
});
