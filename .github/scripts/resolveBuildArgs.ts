import { spawnSync } from "node:child_process";
import { appendFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ALL_PACKAGES = "--recursive";

// A change to any of these reaches every deck's output. home/fonts/ is in the
// list because a deck aliases it through its vite config.
const SHARED =
	/^(package\.json|pnpm-lock\.yaml|pnpm-workspace\.yaml|patches\/|home\/fonts\/)/;

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "..", "..");

const fail: (message: string) => never = (message) => {
	console.error(message);
	process.exit(1);
};

const required = (name: string): string =>
	process.env[name] ?? fail(`${name} is not set`);

const commitExists = (rev: string): boolean =>
	spawnSync("git", ["cat-file", "-e", `${rev}^{commit}`], {
		cwd: repoRoot,
		stdio: "ignore",
	}).status === 0;

const changedFiles = (base: string, head: string): string[] | null => {
	const { status, stdout } = spawnSync(
		"git",
		["diff", "--name-only", base, head],
		{ cwd: repoRoot, encoding: "utf8" },
	);
	return status === 0 ? stdout.split("\n").filter(Boolean) : null;
};

const resolve = (): { buildArgs: string; reason: string } => {
	// A manual run has no diff to narrow down.
	if (process.env.GITHUB_EVENT_NAME === "workflow_dispatch") {
		return { buildArgs: ALL_PACKAGES, reason: "manual run" };
	}

	const head = required("GITHUB_SHA");
	const before = required("PUSH_BEFORE");
	// A force push or a first push leaves nothing to diff against.
	if (!commitExists(before)) {
		return { buildArgs: ALL_PACKAGES, reason: `cannot reach ${before}` };
	}

	const changed = changedFiles(before, head);
	// Reading a git failure as "nothing changed" would silently skip a deck.
	if (changed === null) {
		return {
			buildArgs: ALL_PACKAGES,
			reason: `cannot diff ${before}..${head}`,
		};
	}
	if (changed.some((file) => SHARED.test(file))) {
		return { buildArgs: ALL_PACKAGES, reason: "a shared dependency changed" };
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

	// The homepage build is a copy of style.css, so it always runs.
	return {
		buildArgs: [
			"--filter slide-home",
			...decks.map((deck) => `--filter ${deck}`),
		].join(" "),
		reason:
			decks.length > 0
				? `changed decks: ${decks.join(", ")}`
				: "no deck changed",
	};
};

const { buildArgs, reason } = resolve();

console.log(`building ${buildArgs} (${reason})`);

appendFileSync(required("GITHUB_OUTPUT"), `build-args=${buildArgs}\n`);
