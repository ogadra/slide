import { spawnSync } from "node:child_process";
import { appendFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

export const ALL_PACKAGES = "--recursive";

// A change to any of these reaches every deck. home/fonts/ is aliased by a deck's vite config.
export const SHARED =
	/^(package\.json|pnpm-lock\.yaml|pnpm-workspace\.yaml|patches\/|home\/fonts\/)/;

export type Push = {
	eventName: string | undefined;
	before: string;
	head: string;
	// A force push or a first push leaves nothing to diff against.
	beforeExists: boolean;
	// null when git could not answer, which has to stay distinct from an empty list.
	changedFiles: string[] | null;
	deckExists: (deck: string) => boolean;
};

export const resolveBuildArgs = (
	push: Push,
): { buildArgs: string; reason: string } => {
	// A manual run has no diff to narrow down.
	if (push.eventName === "workflow_dispatch") {
		return { buildArgs: ALL_PACKAGES, reason: "manual run" };
	}

	if (!push.beforeExists) {
		return { buildArgs: ALL_PACKAGES, reason: `cannot reach ${push.before}` };
	}

	if (push.changedFiles === null) {
		return {
			buildArgs: ALL_PACKAGES,
			reason: `cannot diff ${push.before}..${push.head}`,
		};
	}

	if (push.changedFiles.some((file) => SHARED.test(file))) {
		return { buildArgs: ALL_PACKAGES, reason: "a shared dependency changed" };
	}

	const decks = [
		...new Set(
			push.changedFiles
				.filter((file) => file.startsWith("slidev/"))
				.map((file) => file.split("/")[1]),
		),
	].filter(
		(deck): deck is string => deck !== undefined && push.deckExists(deck),
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

if (import.meta.main) {
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

	const eventName = process.env.GITHUB_EVENT_NAME;
	const manual = eventName === "workflow_dispatch";

	// A manual run builds everything, so it never has to read the push env.
	const head = manual ? "" : required("GITHUB_SHA");
	const before = manual ? "" : required("PUSH_BEFORE");
	const beforeExists = !manual && commitExists(before);

	const { buildArgs, reason } = resolveBuildArgs({
		eventName,
		before,
		head,
		beforeExists,
		changedFiles: beforeExists ? changedFiles(before, head) : null,
		deckExists: (deck) => existsSync(join(repoRoot, "slidev", deck)),
	});

	console.log(`building ${buildArgs} (${reason})`);

	appendFileSync(required("GITHUB_OUTPUT"), `build-args=${buildArgs}\n`);
}
