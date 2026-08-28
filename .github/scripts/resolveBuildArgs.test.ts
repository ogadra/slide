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
	...over,
});

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
		"pnpm-lock.yaml",
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

	// The dependabot path: a lockfile bump has to reach every deck, not just the changed ones.
	it("builds everything when a bump touches the lockfile alongside a deck", () => {
		const { buildArgs } = resolveBuildArgs(
			push({
				changedFiles: ["pnpm-lock.yaml", "slidev/remix-on-hono/slides.md"],
			}),
		);

		expect(buildArgs).toBe(ALL_PACKAGES);
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
