import { expect, test } from "@playwright/test";
import { collectConsoleErrors } from "./consoleErrors.ts";

test("the deck opens on the slidev dev server without console errors", async ({
	page,
}) => {
	const errors = await collectConsoleErrors(page);

	await page.goto("/");
	await expect(page.locator('[data-slidev-no="1"]')).toBeVisible();
	await page.waitForLoadState("networkidle");

	expect(errors).toEqual([]);
});
