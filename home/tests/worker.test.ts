import { env, SELF } from "cloudflare:test";
import { beforeAll, describe, expect, it } from "vitest";
import { manifest, slideTitles } from "../generated/manifest";

const ORIGIN = "https://slide.ogadra.com";

// Taken from the manifest so a renamed deck does not break the test.
const KNOWN_DECK = Object.keys(slideTitles)[0];
if (KNOWN_DECK === undefined) {
	throw new Error("the manifest has no decks, so nothing here can be tested");
}

const DECK_HTML =
	"<!DOCTYPE html><html><head><title>built by slidev</title></head><body></body></html>";

const get = (path: string) => SELF.fetch(`${ORIGIN}${path}`);

const meta = (html: string, name: string) =>
	html.match(
		new RegExp(`<meta (?:name|property)="${name}" content="([^"]*)"`),
	)?.[1];

// syncAssets sets a content type on every upload, so the fixtures carry one too.
const seed = (key: string, body: string, contentType: string) =>
	env.ASSETS.put(key, body, { httpMetadata: { contentType } });

beforeAll(async () => {
	await seed(`slides/${KNOWN_DECK}/index.html`, DECK_HTML, "text/html");
	await seed(
		`slides/${KNOWN_DECK}/assets/deck.js`,
		"console.log(1)",
		"text/javascript",
	);
	await seed("home/assets/style.css", "body { color: red }", "text/css");
	// R2 serves this one but the manifest never will, which is the drift to catch.
	await seed("slides/not-in-the-manifest/index.html", DECK_HTML, "text/html");
});

describe("the homepage", () => {
	it("lists every deck the manifest holds", async () => {
		const response = await get("/");
		expect(response.status).toBe(200);
		expect(response.headers.get("content-type")).toContain("text/html");

		const html = await response.text();
		for (const group of manifest) {
			for (const slide of group.slides) {
				expect(html).toContain(`./${slide.name}`);
			}
		}
	});
});

describe("a deck page", () => {
	it("keeps the built HTML and adds the OGP tags", async () => {
		const html = await get(`/${KNOWN_DECK}`).then((r) => r.text());

		expect(html).toContain("<title>built by slidev</title>");
		expect(meta(html, "og:image")).toBe(
			`${ORIGIN}/${KNOWN_DECK}/slides-export/1.png`,
		);
		expect(meta(html, "twitter:card")).toBe("summary_large_image");
		expect(meta(html, "twitter:image")).toBe(
			`${ORIGIN}/${KNOWN_DECK}/slides-export/1.png`,
		);
		expect(meta(html, "twitter:title")).toBe(slideTitles[KNOWN_DECK]);
	});

	it("points the OGP image at the slide being linked to", async () => {
		const html = await get(`/${KNOWN_DECK}/7`).then((r) => r.text());

		expect(meta(html, "og:image")).toBe(
			`${ORIGIN}/${KNOWN_DECK}/slides-export/7.png`,
		);
	});

	it("serves the presenter route off the same export", async () => {
		const html = await get(`/${KNOWN_DECK}/presenter/3`).then((r) => r.text());

		expect(meta(html, "og:image")).toBe(
			`${ORIGIN}/${KNOWN_DECK}/slides-export/3.png`,
		);
	});

	it("404s a deck R2 does not have", async () => {
		expect((await get("/no-such-deck")).status).toBe(404);
	});

	// Letting this through would serve a deck with another deck's OGP title.
	it("500s when R2 and the manifest disagree", async () => {
		expect((await get("/not-in-the-manifest")).status).toBe(500);
	});
});

describe("the asset routes", () => {
	it("reads /assets/* out of the home prefix", async () => {
		const response = await get("/assets/style.css");

		expect(response.status).toBe(200);
		expect(response.headers.get("content-type")).toBe("text/css");
		expect(await response.text()).toBe("body { color: red }");
	});

	it("reads everything else out of the slides prefix", async () => {
		const response = await get(`/${KNOWN_DECK}/assets/deck.js`);

		expect(response.status).toBe(200);
		expect(response.headers.get("content-type")).toBe("text/javascript");
		expect(await response.text()).toBe("console.log(1)");
	});

	// A browser that revalidates gets a 304 only if this survives.
	it("passes R2's etag through", async () => {
		const response = await get("/assets/style.css");

		expect(response.headers.get("etag")).toMatch(/^"?[0-9a-f]{32}"?$/);
	});

	it("404s an object the bucket does not hold", async () => {
		expect((await get("/assets/missing.css")).status).toBe(404);
		expect((await get(`/${KNOWN_DECK}/assets/missing.js`)).status).toBe(404);
	});
});
