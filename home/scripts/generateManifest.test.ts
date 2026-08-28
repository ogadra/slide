import { describe, expect, it } from "vitest";
import {
	type Deck,
	groupDecks,
	parseDeck,
	renderManifest,
} from "./generateManifest.ts";

const headmatter = (body: string, rest = "") => `---\n${body}\n---\n${rest}`;

const FULL = headmatter(
	[
		"theme: purplin",
		"title: 'ある発表'",
		"date: '2026/08/20'",
		"event: 'ある勉強会'",
		"eventLink: 'https://connpass.com/event/1'",
		"order: 2",
	].join("\n"),
);

const aDeck = (over: Partial<Deck> = {}): Deck => ({
	name: "a",
	title: "A",
	date: "2026/01/01",
	event: "E",
	eventLink: undefined,
	order: 0,
	...over,
});

describe("parseDeck", () => {
	it("reads every key out of the headmatter", () => {
		expect(parseDeck("a-deck", FULL)).toEqual({
			errors: [],
			deck: {
				name: "a-deck",
				title: "ある発表",
				date: "2026/08/20",
				event: "ある勉強会",
				eventLink: "https://connpass.com/event/1",
				order: 2,
			},
		});
	});

	it("defaults order to 0 and leaves eventLink off", () => {
		const { deck, errors } = parseDeck(
			"a",
			headmatter("title: 'T'\ndate: '2026/08/20'\nevent: 'E'"),
		);

		expect(errors).toEqual([]);
		expect(deck).toMatchObject({ order: 0, eventLink: undefined });
	});

	// Every `---` after the leading block opens a slide, so the parser stops at the first one.
	it("stops at the end of the leading block", () => {
		const { deck, errors } = parseDeck(
			"a",
			headmatter(
				"title: 'T'\ndate: '2026/08/20'\nevent: 'E'",
				"# first slide\n\n---\n\ntitle: 'not the deck title'\n\n---\n",
			),
		);

		expect(errors).toEqual([]);
		expect(deck?.title).toBe("T");
	});

	// Unquoted, everything from the ' #' on is a YAML comment and the name loses its tail.
	it("catches an unquoted value that a ' #' would truncate", () => {
		const { errors } = parseDeck(
			"a",
			headmatter("title: 'T'\ndate: '2026/08/20'\nevent: 埼京.dev #3"),
		);

		expect(errors).toEqual([
			"slidev/a/slides.md: quote the value of event, a ' #' would start a comment",
		]);
	});

	it("leaves a quoted ' #' alone", () => {
		const { deck, errors } = parseDeck(
			"a",
			headmatter("title: 'T'\ndate: '2026/08/20'\nevent: '埼京.dev #3'"),
		);

		expect(errors).toEqual([]);
		expect(deck?.event).toBe("埼京.dev #3");
	});

	it.each([
		["a missing title", "date: '2026/08/20'\nevent: 'E'", "title must be"],
		[
			"a date in the wrong shape",
			"title: 'T'\ndate: '2026-08-20'\nevent: 'E'",
			"date must look like",
		],
		[
			"an eventLink that is not a URL",
			"title: 'T'\ndate: '2026/08/20'\nevent: 'E'\neventLink: 'connpass.com'",
			"eventLink must be an http(s) URL",
		],
		[
			"a non-numeric order",
			"title: 'T'\ndate: '2026/08/20'\nevent: 'E'\norder: 'first'",
			"order must be a number",
		],
	])("rejects %s", (_, body, message) => {
		const { deck, errors } = parseDeck("a", headmatter(body));

		expect(deck).toBeNull();
		expect(errors.join("\n")).toContain(message);
	});

	it("rejects a file that does not open with a headmatter block", () => {
		const { deck, errors } = parseDeck("a", "# just a slide\n");

		expect(deck).toBeNull();
		expect(errors).toEqual([
			"slidev/a/slides.md: does not start with a headmatter block",
		]);
	});

	it("rejects a headmatter block that is never closed", () => {
		const { deck, errors } = parseDeck("a", "---\ntitle: 'T'\n");

		expect(deck).toBeNull();
		expect(errors).toEqual([
			"slidev/a/slides.md: the headmatter block is never closed",
		]);
	});
});

describe("groupDecks", () => {
	it("puts the decks of one event together, newest event first", () => {
		const { groups, errors } = groupDecks([
			aDeck({ name: "old", date: "2025/01/01", event: "E1" }),
			aDeck({ name: "b", date: "2026/01/01", event: "E2", order: 2 }),
			aDeck({ name: "a", date: "2026/01/01", event: "E2", order: 1 }),
		]);

		expect(errors).toEqual([]);
		expect(groups.map((g) => g.event)).toEqual(["E2", "E1"]);
		expect(groups[0]?.decks.map((d) => d.name)).toEqual(["a", "b"]);
	});

	it("falls back to the name when the order ties", () => {
		const { groups } = groupDecks([
			aDeck({ name: "zebra" }),
			aDeck({ name: "alpha" }),
		]);

		expect(groups[0]?.decks.map((d) => d.name)).toEqual(["alpha", "zebra"]);
	});

	// Keeping the first link would drop the second deck's without a word.
	it("reports two decks of one event disagreeing on the link", () => {
		const { errors } = groupDecks([
			aDeck({ name: "a", eventLink: "https://a.example" }),
			aDeck({ name: "b", eventLink: "https://b.example" }),
		]);

		expect(errors).toEqual([
			"slidev/b/slides.md: eventLink disagrees with the other decks of E",
		]);
	});
});

describe("renderManifest", () => {
	it("writes the link only for the events that have one", () => {
		const output = renderManifest(
			groupDecks([
				aDeck({ name: "a", event: "linked", eventLink: "https://a.example" }),
				aDeck({ name: "b", date: "2025/01/01", event: "bare" }),
			]).groups,
		);

		expect(output).toContain('eventLink: "https://a.example"');
		expect(output.match(/eventLink/g)).toHaveLength(2); // the type plus the one entry
	});

	it("indexes every deck's title by name", () => {
		const output = renderManifest(
			groupDecks([aDeck({ name: "a", title: "A" })]).groups,
		);

		expect(output).toContain('"a": "A",');
	});
});
