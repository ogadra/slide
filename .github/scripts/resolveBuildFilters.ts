import { spawnSync } from "node:child_process";
import { appendFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const EVERYTHING = "--recursive";

// A change to any of these reaches every deck's output.
const SHARED = /^(package\.json|pnpm-lock\.yaml|pnpm-workspace\.yaml|patches\/)/;

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "..", "..");

const commitExists = (rev: string): boolean =>
	spawnSync("git", ["cat-file", "-e", `${rev}^{commit}`], {
		cwd: repoRoot,
		stdio: "ignore",
	}).status === 0;

// null means git could not answer, which reads the same as "nothing changed"
// unless the caller keeps them apart.
const changedFiles = (base: string, head: string): string[] | null => {
	const { status, stdout } = spawnSync(
		"git",
		["diff", "--name-only", base, head],
		{ cwd: repoRoot, encoding: "utf8" },
	);
	return status === 0 ? stdout.split("\n").filter(Boolean) : null;
};

const resolve = (): { filters: string; reason: string } => {
	// A manual run has no diff to narrow down.
	if (process.env.GITHUB_EVENT_NAME === "workflow_dispatch") {
		return { filters: EVERYTHING, reason: "manual run" };
	}

	const head = process.env.GITHUB_SHA ?? "HEAD";
	const before = process.env.PUSH_BEFORE ?? "";
	// A force push or a first push leaves nothing to diff against.
	const base = before !== "" && commitExists(before) ? before : `${head}^`;

	const changed = changedFiles(base, head);
	// The checkout is shallow, so the starting point may not have been fetched.
	// Assuming nothing changed would silently skip a deck.
	if (changed === null) {
		return { filters: EVERYTHING, reason: `cannot diff against ${base}` };
	}
	if (changed.some((file) => SHARED.test(file))) {
		return { filters: EVERYTHING, reason: "a shared dependency changed" };
	}

	const decks = [
		...new Set(
			changed
				.filter((file) => file.startsWith("slidev/"))
				.map((file) => file.split("/")[1]),
		),
	].filter(
		(deck): deck is string =>
			deck !== undefined && existsSync(join(repoRoot, "slidev", deck)),
	);

	// The homepage is cheap and its output carries the deck index, so it always
	// builds. Decks build only when their own directory changed.
	return {
		filters: ["--filter slide-home", ...decks.map((deck) => `--filter ${deck}`)].join(
			" ",
		),
		reason: decks.length > 0 ? `changed decks: ${decks.join(", ")}` : "no deck changed",
	};
};

const { filters, reason } = resolve();

console.error(`building ${filters} (${reason})`);
console.log(filters);

const githubOutput = process.env.GITHUB_OUTPUT;
if (githubOutput !== undefined) {
	appendFileSync(githubOutput, `filters=${filters}\n`);
}
