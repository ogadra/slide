import { expect, test } from "@playwright/test";
import { manifest } from "../home/generated/manifest.ts";

// The same entry e2eFixture builds, so the deck opened here is the deck that exists.
const deck = manifest[0]?.slides[0];
if (deck === undefined) {
	throw new Error("the manifest holds no decks, so there is nothing to open");
}

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

test("the deck opens from the homepage and its slides advance", async ({
	page,
}) => {
	await page.goto("/");

	// The thumbnail anchor carries target=_blank, so the deck arrives in a new tab.
	const [deckPage] = await Promise.all([
		page.context().waitForEvent("page"),
		page.getByRole("link", { name: deck.title }).click(),
	]);

	await expect(deckPage).toHaveURL(new RegExp(`/${deck.name}/?$`));
	await expect(deckPage.locator('[data-slidev-no="1"]')).toBeVisible();

	// Shift skips the click animations, so this advances a slide whatever the deck holds.
	await deckPage.keyboard.press("Shift+ArrowRight");

	await expect(deckPage).toHaveURL(new RegExp(`/${deck.name}/2$`));
	// Slidev keeps both in the DOM and swaps which one shows.
	await expect(deckPage.locator('[data-slidev-no="2"]')).toBeVisible();
	await expect(deckPage.locator('[data-slidev-no="1"]')).toBeHidden();
});
