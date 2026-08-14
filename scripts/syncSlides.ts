import { spawnSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, extname, join } from "node:path";
import { fileURLToPath } from "node:url";

const BUCKETS = {
	prd: "slide-decks",
	dev: "slide-decks-dev",
	// `wrangler dev --env dev` binds this bucket name in its own local storage.
	local: "slide-decks-dev",
} as const;

type TargetEnv = keyof typeof BUCKETS;

// rclone derives these itself; the local bucket needs them spelled out.
const CONTENT_TYPES: Record<string, string> = {
	".css": "text/css",
	".gif": "image/gif",
	".html": "text/html",
	".jpg": "image/jpeg",
	".js": "text/javascript",
	".png": "image/png",
	".svg": "image/svg+xml",
	".ttf": "font/ttf",
	".woff": "font/woff",
	".woff2": "font/woff2",
};

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const slidesSource = join(repoRoot, "slidev");
const slidesDist = join(repoRoot, "dist", "slides");
const localPersist = join(repoRoot, ".wrangler", "state", "v3", "r2");

// The annotation sits on the binding so control flow analysis knows a call never returns.
const fail: (message: string) => never = (message) => {
	console.error(message);
	process.exit(1);
};

const isTargetEnv = (value: string): value is TargetEnv => value in BUCKETS;

const requireEnv = (name: string): string => {
	const value = process.env[name];
	if (!value) {
		fail(`environment variable ${name} is not set`);
	}
	return value;
};

const walk = (dir: string): string[] =>
	readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
		const path = join(dir, entry.name);
		return entry.isDirectory() ? walk(path) : [path];
	});

const seedLocal = async (bucketName: string, decks: string[]) => {
	// Only the local target needs miniflare, so it stays out of a deploy's startup.
	const { Miniflare } = await import("miniflare");
	const binding = "SLIDE_ASSETS";
	const mf = new Miniflare({
		modules: true,
		script: "export default {};",
		r2Buckets: { [binding]: bucketName },
		r2Persist: localPersist,
	});
	const bucket = await mf.getR2Bucket(binding);

	for (const deck of decks) {
		for (const file of walk(join(slidesDist, deck))) {
			await bucket.put(file.slice(slidesDist.length + 1), readFileSync(file), {
				httpMetadata: {
					contentType:
						CONTENT_TYPES[extname(file).toLowerCase()] ??
						"application/octet-stream",
				},
			});
		}
	}

	await mf.dispose();
};

const syncWithRclone = (
	targetEnv: Exclude<TargetEnv, "local">,
	bucketName: string,
	decks: string[],
) => {
	if (spawnSync("rclone", ["version"], { stdio: "ignore" }).error) {
		fail("rclone is not installed");
	}

	const suffix = targetEnv.toUpperCase();
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

	// A redrawing progress bar is unreadable in CI logs; log each transfer there instead.
	const reportFlags = process.stdout.isTTY
		? ["--progress"]
		: ["--verbose", "--stats", "0"];

	for (const deck of decks) {
		console.log(`==> syncing ${deck} to ${bucketName}`);
		const { status, error } = spawnSync(
			"rclone",
			[
				"sync",
				join(slidesDist, deck),
				`:s3:${bucketName}/${deck}`,
				"--checksum",
				...reportFlags,
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

	console.log(`==> done: ${decks.length} deck(s) synced to ${bucketName}`);
};

const [targetEnv] = process.argv.slice(2);
if (targetEnv === undefined || !isTargetEnv(targetEnv)) {
	fail(`target must be prd, dev or local, got: ${targetEnv ?? "(nothing)"}`);
}

const bucketName = BUCKETS[targetEnv];

const decks = readdirSync(slidesSource, { withFileTypes: true })
	.filter((entry) => entry.isDirectory())
	.map((entry) => entry.name);

const missing = decks.filter((deck) => !existsSync(join(slidesDist, deck)));
if (missing.length > 0) {
	fail(
		`no build output for: ${missing.join(", ")}\nRun \`pnpm run build\` first.`,
	);
}

if (targetEnv === "local") {
	await seedLocal(bucketName, decks);
} else {
	syncWithRclone(targetEnv, bucketName, decks);
}
