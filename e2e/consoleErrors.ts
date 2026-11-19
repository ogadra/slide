import type { Page } from "@playwright/test";

// Headless Chromium always denies the wake lock Slidev requests, and Playwright cannot grant it, so a sentinel stands in.
const grantWakeLock = () => {
	const sentinel = Object.assign(new EventTarget(), {
		released: false,
		type: "screen",
		release: async () => {},
		onrelease: null,
	});
	Object.defineProperty(navigator, "wakeLock", {
		value: { request: async () => sentinel },
	});
};

// Uncaught exceptions skip console.error, so both sources are collected.
export const collectConsoleErrors = async (page: Page): Promise<string[]> => {
	await page.addInitScript(grantWakeLock);
	const errors: string[] = [];
	page.on("console", (message) => {
		if (message.type() === "error") {
			errors.push(message.text());
		}
	});
	page.on("pageerror", (error) => {
		errors.push(error.message);
	});
	return errors;
};
