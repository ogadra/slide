import { spawnSync } from "node:child_process";
import { existsSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const BUCKETS = {
	prd: "slide-decks",
	dev: "slide-decks-dev",
} as const;

type TargetEnv = keyof typeof BUCKETS;

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const slidesSource = join(repoRoot, "slidev");
const slidesDist = join(repoRoot, "dist", "slides");

const usage = `Usage: node scripts/sync-slides.ts --env prd|dev [--dry-run]

Syncs every deck under dist/slides/ to the R2 bucket. Build first with \`pnpm -r build\`.

Required environment variables (the token is scoped per environment):
  R2_ACCOUNT_ID
  R2_ACCESS_KEY_ID_PRD     / R2_ACCESS_KEY_ID_DEV
  R2_SECRET_ACCESS_KEY_PRD / R2_SECRET_ACCESS_KEY_DEV
`;

// The annotation sits on the binding so control flow analysis knows a call never returns.
const fail: (message: string) => never = (message) => {
	console.error(message);
	process.exit(1);
};

const isTargetEnv = (value: string): value is TargetEnv => value in BUCKETS;

const parseArgs = (argv: string[]) => {
	let targetEnv: TargetEnv | undefined;
	let dryRun = false;

	for (let i = 0; i < argv.length; i++) {
		const arg = argv[i];
		switch (arg) {
			case "--env": {
				const value = argv[++i];
				if (value === undefined || !isTargetEnv(value)) {
					fail(`--env must be prd or dev, got: ${value ?? "(nothing)"}`);
				}
				targetEnv = value;
				break;
			}
			case "--dry-run":
				dryRun = true;
				break;
			case "-h":
			case "--help":
				console.log(usage);
				process.exit(0);
			default:
				fail(`unknown argument: ${arg}\n\n${usage}`);
		}
	}

	if (targetEnv === undefined) {
		fail(`--env is required\n\n${usage}`);
	}

	return { targetEnv, dryRun };
};

const requireEnv = (name: string): string => {
	const value = process.env[name];
	if (!value) {
		fail(`environment variable ${name} is not set`);
	}
	return value;
};

const { targetEnv, dryRun } = parseArgs(process.argv.slice(2));
const bucket = BUCKETS[targetEnv];
const suffix = targetEnv.toUpperCase();

if (spawnSync("rclone", ["version"], { stdio: "ignore" }).error) {
	fail("rclone is not installed");
}

const rcloneEnv = {
	...process.env,
	RCLONE_S3_PROVIDER: "Cloudflare",
	RCLONE_S3_REGION: "auto",
	RCLONE_S3_ENDPOINT: `https://${requireEnv("R2_ACCOUNT_ID")}.r2.cloudflarestorage.com`,
	RCLONE_S3_ACCESS_KEY_ID: requireEnv(`R2_ACCESS_KEY_ID_${suffix}`),
	RCLONE_S3_SECRET_ACCESS_KEY: requireEnv(`R2_SECRET_ACCESS_KEY_${suffix}`),
	// The sync token is scoped to the bucket and cannot list buckets.
	RCLONE_S3_NO_CHECK_BUCKET: "true",
};

const decks = readdirSync(slidesSource, { withFileTypes: true })
	.filter((entry) => entry.isDirectory())
	.map((entry) => entry.name);

const missing = decks.filter((deck) => !existsSync(join(slidesDist, deck)));
if (missing.length > 0) {
	fail(`no build output for: ${missing.join(", ")}\nRun \`pnpm -r build\` first.`);
}

// A redrawing progress bar is unreadable in CI logs; log each transfer there instead.
const reportFlags = process.stdout.isTTY
	? ["--progress"]
	: ["--verbose", "--stats", "0"];

for (const deck of decks) {
	console.log(`==> syncing ${deck} to ${bucket}`);
	const { status, error } = spawnSync(
		"rclone",
		[
			"sync",
			join(slidesDist, deck),
			`:s3:${bucket}/${deck}`,
			"--checksum",
			...reportFlags,
			...(dryRun ? ["--dry-run"] : []),
		],
		{ stdio: "inherit", env: rcloneEnv },
	);

	if (error) {
		fail(`failed to run rclone: ${error.message}`);
	}
	if (status !== 0) {
		fail(`rclone exited with ${status} while syncing ${deck}`);
	}
}

console.log(`==> done: ${decks.length} deck(s) synced to ${bucket}`);
