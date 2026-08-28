import { describe, expect, it } from "vitest";
import { HeadHandler } from "../htmlRewriter";

const PAGE =
	"<!DOCTYPE html><html><head><title>built by slidev</title></head><body>slide</body></html>";

const rewrite = (image: string, title: string, html = PAGE) =>
	// biome-ignore lint/correctness/noUndeclaredVariables: Workers runtime global
	new HTMLRewriter()
		.on("head", new HeadHandler(image, title))
		.transform(new Response(html))
		.text();

const meta = (html: string, name: string) =>
	html.match(
		new RegExp(`<meta (?:name|property)="${name}" content="([^"]*)"`),
	)?.[1];

describe("HeadHandler", () => {
	it("appends the OGP tags without dropping what the deck already had", async () => {
		const html = await rewrite("https://slide.ogadra.com/d/1.png", "ある発表");

		expect(html).toContain("<title>built by slidev</title>");
		expect(html).toContain("<body>slide</body>");
		expect(meta(html, "og:image")).toBe("https://slide.ogadra.com/d/1.png");
		expect(meta(html, "twitter:card")).toBe("summary_large_image");
		expect(meta(html, "twitter:image")).toBe(
			"https://slide.ogadra.com/d/1.png",
		);
		expect(meta(html, "twitter:title")).toBe("ある発表");
		expect(meta(html, "twitter:text:title")).toBe("ある発表");
	});

	// Deck titles are hand-authored, so a quote in one would end the attribute early.
	it("escapes a title that would otherwise break out of the attribute", async () => {
		const html = await rewrite(
			"https://slide.ogadra.com/d/1.png",
			`"><script>alert(1)</script> & 'それ'`,
		);

		expect(html).not.toContain("<script>");
		expect(meta(html, "twitter:title")).toBe(
			"&quot;&gt;&lt;script&gt;alert(1)&lt;/script&gt; &amp; &#39;それ&#39;",
		);
	});

	it("escapes the image URL", async () => {
		const html = await rewrite(
			`https://slide.ogadra.com/d/1.png?a=1&b="2"`,
			"ある発表",
		);

		expect(meta(html, "og:image")).toBe(
			"https://slide.ogadra.com/d/1.png?a=1&amp;b=&quot;2&quot;",
		);
	});

	// slidev always emits a head; a silent no-op would hide a broken build behind a 200.
	it("leaves a page without a head alone", async () => {
		const html = await rewrite(
			"https://slide.ogadra.com/d/1.png",
			"ある発表",
			"<html><body>no head</body></html>",
		);

		expect(html).not.toContain("og:image");
	});
});
