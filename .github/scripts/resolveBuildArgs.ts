import { spawnSync } from "node:child_process";
import { appendFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

export const ALL_PACKAGES = "--recursive";

const LOCKFILE = "pnpm-lock.yaml";

// A change to any of these reaches every deck. home/fonts/ is aliased by a deck's vite config.
export const SHARED =
	/^(package\.json|pnpm-workspace\.yaml|patches\/|home\/fonts\/)/;

export type Push = {
	eventName: string | undefined;
	before: string;
	head: string;
	// A force push or a first push leaves nothing to diff against.
	beforeExists: boolean;
	// null when git could not answer, which has to stay distinct from an empty list.
	changedFiles: string[] | null;
	deckExists: (deck: string) => boolean;
	// Reads a file at a revision, null when git cannot answer.
	showFile: (rev: string, file: string) => string | null;
};

// Lets an importers-only lockfile diff stay a partial build.
const parseLockfile = (
	text: string | null,
): { importers: Map<string, string>; rest: string } | null => {
	if (text === null) {
		return null;
	}
	const lines = text.split("\n");
	const start = lines.indexOf("importers:");
	if (start === -1) {
		return null;
	}
	let end = lines.length;
	for (let i = start + 1; i < lines.length; i++) {
		if (/^\S/.test(lines[i] ?? "")) {
			end = i;
			break;
		}
	}
	const importers = new Map<string, string>();
	let key: string | null = null;
	for (const line of lines.slice(start + 1, end)) {
		const entry = /^  (\S[^:]*):/.exec(line);
		if (entry?.[1] !== undefined) {
			key = entry[1];
			importers.set(key, `${line}\n`);
		} else if (key !== null) {
			importers.set(key, `${importers.get(key) ?? ""}${line}\n`);
		}
	}
	return {
		importers,
		rest: [...lines.slice(0, start), ...lines.slice(end)].join("\n"),
	};
};

// null means the diff reached shared ground, so every deck rebuilds.
const changedLockfileDecks = (push: Push): string[] | null => {
	const before = parseLockfile(push.showFile(push.before, LOCKFILE));
	const head = parseLockfile(push.showFile(push.head, LOCKFILE));
	if (before === null || head === null || before.rest !== head.rest) {
		return null;
	}
	const decks: string[] = [];
	for (const key of new Set([
		...before.importers.keys(),
		...head.importers.keys(),
	])) {
		if (before.importers.get(key) === head.importers.get(key)) {
			continue;
		}
		// The root importer feeds every deck's build.
		if (!key.startsWith("slidev/")) {
			return null;
		}
		decks.push(key.slice("slidev/".length));
	}
	return decks;
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

	const decks = new Set(
		push.changedFiles
			.filter((file) => file.startsWith("slidev/"))
			.map((file) => file.split("/")[1]),
	);

	if (push.changedFiles.includes(LOCKFILE)) {
		const lockfileDecks = changedLockfileDecks(push);
		if (lockfileDecks === null) {
			return {
				buildArgs: ALL_PACKAGES,
				reason: "a shared dependency changed",
			};
		}
		for (const deck of lockfileDecks) {
			decks.add(deck);
		}
	}

	const targets = [...decks].filter(
		(deck): deck is string => deck !== undefined && push.deckExists(deck),
	);

	// The homepage build is a copy of style.css, so it always runs.
	return {
		buildArgs: [
			"--filter slide-home",
			...targets.map((deck) => `--filter ${deck}`),
		].join(" "),
		reason:
			targets.length > 0
				? `changed decks: ${targets.join(", ")}`
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

	const showFile = (rev: string, file: string): string | null => {
		const { status, stdout } = spawnSync("git", ["show", `${rev}:${file}`], {
			cwd: repoRoot,
			encoding: "utf8",
		});
		return status === 0 ? stdout : null;
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
		showFile,
	});

	console.log(`building ${buildArgs} (${reason})`);

	appendFileSync(required("GITHUB_OUTPUT"), `build-args=${buildArgs}\n`);
}
