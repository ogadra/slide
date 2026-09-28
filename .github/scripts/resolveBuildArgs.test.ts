import { describe, expect, it } from "vitest";
import { ALL_PACKAGES, type Push, resolveBuildArgs } from "./resolveBuildArgs.ts";

const KNOWN_DECKS = ["remix-on-hono", "fargate-as-sandbox"];

const push = (over: Partial<Push> = {}): Push => ({
	eventName: "push",
	before: "aaaaaaa",
	head: "bbbbbbb",
	beforeExists: true,
	changedFiles: [],
	deckExists: (deck) => KNOWN_DECKS.includes(deck),
	showFile: () => null,
	...over,
});

const IMPORTERS = `importers:

  .:
    devDependencies:
      "@slidev/cli":
        specifier: ^52.0.0
        version: 52.0.0

  home: {}

  slidev/remix-on-hono: {}

  slidev/fargate-as-sandbox: {}
`;

const lockfile = (
	importers = IMPORTERS,
	tail = "packages:\n  '@slidev/cli@52.0.0':\n",
): string => `lockfileVersion: '9.0'\n\n${importers}\n${tail}`;

// resolveBuildArgs reads the lockfile at before ("aaaaaaa") and head ("bbbbbbb").
const showFile =
	(before: string, head: string) =>
	(rev: string): string | null =>
		rev === "aaaaaaa" ? before : head;

describe("resolveBuildArgs", () => {
	it("builds everything on a manual run", () => {
		const { buildArgs, reason } = resolveBuildArgs(
			push({ eventName: "workflow_dispatch" }),
		);

		expect(buildArgs).toBe(ALL_PACKAGES);
		expect(reason).toBe("manual run");
	});

	// A force push or a first push leaves nothing to diff against.
	it("builds everything when the previous commit is gone", () => {
		const { buildArgs, reason } = resolveBuildArgs(
			push({ beforeExists: false }),
		);

		expect(buildArgs).toBe(ALL_PACKAGES);
		expect(reason).toContain("cannot reach");
	});

	// Reading a git failure as "nothing changed" would deploy a stale deck.
	it("builds everything when git cannot answer", () => {
		const { buildArgs, reason } = resolveBuildArgs(push({ changedFiles: null }));

		expect(buildArgs).toBe(ALL_PACKAGES);
		expect(reason).toContain("cannot diff");
	});

	it.each([
		"package.json",
		"pnpm-workspace.yaml",
		"patches/some-dependency.patch",
		"home/fonts/some.woff2",
	])("builds everything when %s changes", (file) => {
		const { buildArgs, reason } = resolveBuildArgs(
			push({ changedFiles: [file] }),
		);

		expect(buildArgs).toBe(ALL_PACKAGES);
		expect(reason).toBe("a shared dependency changed");
	});

	// The dependabot path: a bump rewrites resolutions outside importers.
	it("builds everything when the lockfile changes outside importers", () => {
		const { buildArgs } = resolveBuildArgs(
			push({
				changedFiles: ["pnpm-lock.yaml", "slidev/remix-on-hono/slides.md"],
				showFile: showFile(
					lockfile(),
					lockfile(
						IMPORTERS.replace("version: 52.0.0", "version: 52.1.0"),
						"packages:\n  '@slidev/cli@52.1.0':\n",
					),
				),
			}),
		);

		expect(buildArgs).toBe(ALL_PACKAGES);
	});

	// The root importer feeds every deck, even via an importers-only diff.
	it("builds everything when a non-deck importer changes", () => {
		const { buildArgs } = resolveBuildArgs(
			push({
				changedFiles: ["pnpm-lock.yaml"],
				showFile: showFile(
					lockfile(),
					lockfile(IMPORTERS.replace("version: 52.0.0", "version: 52.1.0")),
				),
			}),
		);

		expect(buildArgs).toBe(ALL_PACKAGES);
	});

	it("builds everything when the lockfile cannot be read", () => {
		const { buildArgs } = resolveBuildArgs(
			push({ changedFiles: ["pnpm-lock.yaml"] }),
		);

		expect(buildArgs).toBe(ALL_PACKAGES);
	});

	// Adding a deck always adds its importer entry, which must not force a full build.
	it("builds only the deck whose importer the lockfile gained", () => {
		const { buildArgs, reason } = resolveBuildArgs(
			push({
				changedFiles: [
					"pnpm-lock.yaml",
					"slidev/new-deck/package.json",
					"slidev/new-deck/slides.md",
				],
				deckExists: (deck) => [...KNOWN_DECKS, "new-deck"].includes(deck),
				showFile: showFile(
					lockfile(),
					lockfile(`${IMPORTERS}\n  slidev/new-deck: {}\n`),
				),
			}),
		);

		expect(buildArgs).toBe("--filter slide-home --filter new-deck");
		expect(reason).toBe("changed decks: new-deck");
	});

	// A dep already resolved elsewhere changes only the deck's own importer entry.
	it("builds only the deck whose importer entry changed", () => {
		const { buildArgs } = resolveBuildArgs(
			push({
				changedFiles: ["pnpm-lock.yaml", "slidev/remix-on-hono/package.json"],
				showFile: showFile(
					lockfile(),
					lockfile(
						IMPORTERS.replace(
							"slidev/remix-on-hono: {}",
							"slidev/remix-on-hono:\n    dependencies:\n      vue:\n        specifier: ^3.0.0\n        version: 3.0.0",
						),
					),
				),
			}),
		);

		expect(buildArgs).toBe("--filter slide-home --filter remix-on-hono");
	});

	it("builds only the decks a push touched", () => {
		const { buildArgs, reason } = resolveBuildArgs(
			push({
				changedFiles: [
					"slidev/remix-on-hono/slides.md",
					"slidev/remix-on-hono/components/Footer.vue",
					"slidev/fargate-as-sandbox/uno.config.ts",
				],
			}),
		);

		expect(buildArgs).toBe(
			"--filter slide-home --filter remix-on-hono --filter fargate-as-sandbox",
		);
		expect(reason).toBe("changed decks: remix-on-hono, fargate-as-sandbox");
	});

	// A deleted deck still shows in the diff, and pnpm fails on a filter matching no package.
	it("drops a deck whose directory is gone", () => {
		const { buildArgs } = resolveBuildArgs(
			push({ changedFiles: ["slidev/deleted-deck/slides.md"] }),
		);

		expect(buildArgs).toBe("--filter slide-home");
	});

	// The homepage build copies style.css, so it runs on every push.
	it("still builds the homepage when no deck changed", () => {
		const { buildArgs, reason } = resolveBuildArgs(
			push({ changedFiles: ["README.md", "home/server.ts"] }),
		);

		expect(buildArgs).toBe("--filter slide-home");
		expect(reason).toBe("no deck changed");
	});
});
