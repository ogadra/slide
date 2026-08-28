import { spawnSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, extname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

// The local target reads its bucket out of wrangler.jsonc, so only rclone needs a name.
const BUCKETS = {
	prd: "slide-decks",
	dev: "slide-decks-dev",
} as const;

type RemoteEnv = keyof typeof BUCKETS;

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
const dist = join(repoRoot, "dist");

// The annotation sits on the binding so control flow analysis knows a call never returns.
const fail: (message: string) => never = (message) => {
	console.error(message);
	process.exit(1);
};

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

type Target = { dir: string; prefix: string };

// The proxy is generic over the Worker's env, and seeding only ever puts objects.
type LocalEnv = {
	ASSETS: {
		put: (
			key: string,
			value: Buffer,
			options: { httpMetadata: { contentType: string } },
		) => Promise<unknown>;
	};
};

const seedLocal = async (targets: Target[]) => {
	// Only the local target starts a Worker, so it stays out of a deploy's startup.
	const { getPlatformProxy } = await import("wrangler");
	// The same config and local storage `wrangler dev --env dev` reads, so it lands where
	// the dev server looks. Nothing here is worth reaching Cloudflare for.
	const { env, dispose } = await getPlatformProxy<LocalEnv>({
		environment: "dev",
		remoteBindings: false,
	});

	for (const { dir, prefix } of targets) {
		for (const file of walk(dir)) {
			await env.ASSETS.put(
				`${prefix}/${relative(dir, file)}`,
				readFileSync(file),
				{
					httpMetadata: {
						contentType:
							CONTENT_TYPES[extname(file).toLowerCase()] ??
							"application/octet-stream",
					},
				},
			);
		}
	}

	await dispose();
};

const syncWithRclone = (targetEnv: RemoteEnv, targets: Target[]) => {
	const bucketName = BUCKETS[targetEnv];

	if (spawnSync("rclone", ["version"], { stdio: "ignore" }).error) {
		fail("rclone is not installed");
	}

	const suffix = targetEnv.toUpperCase();
	const rcloneEnv = {
		...process.env,
		RCLONE_S3_PROVIDER: "Cloudflare",
		RCLONE_S3_REGION: "auto",
		RCLONE_S3_ENDPOINT: `https://${requireEnv("CLOUDFLARE_ACCOUNT_ID")}.r2.cloudflarestorage.com`,
		RCLONE_S3_ACCESS_KEY_ID: requireEnv(`R2_ACCESS_KEY_ID_${suffix}`),
		RCLONE_S3_SECRET_ACCESS_KEY: requireEnv(`R2_SECRET_ACCESS_KEY_${suffix}`),
		// The sync token is scoped to the bucket and cannot list buckets.
		RCLONE_S3_NO_CHECK_BUCKET: "true",
	};

	// A redrawing progress bar is unreadable in CI logs; log each transfer there instead.
	const reportFlags = process.stdout.isTTY
		? ["--progress"]
		: ["--verbose", "--stats", "0"];

	for (const { dir, prefix } of targets) {
		console.log(`==> syncing ${prefix} to ${bucketName}`);
		const { status, error } = spawnSync(
			"rclone",
			["sync", dir, `:s3:${bucketName}/${prefix}`, "--checksum", ...reportFlags],
			{ stdio: "inherit", env: rcloneEnv },
		);

		if (error) {
			fail(`failed to run rclone: ${error.message}`);
		}
		if (status !== 0) {
			fail(`rclone exited with ${status} while syncing ${prefix}`);
		}
	}
};

// How dist/ reaches each target's bucket. The local one is the only one held in process.
const SYNCS = {
	prd: (targets: Target[]) => syncWithRclone("prd", targets),
	dev: (targets: Target[]) => syncWithRclone("dev", targets),
	local: seedLocal,
};

type TargetEnv = keyof typeof SYNCS;

const isTargetEnv = (value: string): value is TargetEnv => value in SYNCS;

const [targetEnv] = process.argv.slice(2);
if (targetEnv === undefined || !isTargetEnv(targetEnv)) {
	fail(
		`target must be ${Object.keys(SYNCS).join(", ")}, got: ${targetEnv ?? "(nothing)"}`,
	);
}

// The bucket mirrors dist/, so each target keeps its directory name as the key prefix.
const targets: Target[] = [
	{ dir: join(dist, "home"), prefix: "home" },
	...readdirSync(slidesSource, { withFileTypes: true })
		.filter((entry) => entry.isDirectory())
		.map((entry) => ({
			dir: join(dist, "slides", entry.name),
			prefix: `slides/${entry.name}`,
		})),
];

// CI builds only what a push touched, so dist/ is allowed to be partial.
const built = targets.filter(({ dir }) => existsSync(dir));
const skipped = targets.filter(({ dir }) => !existsSync(dir));

if (skipped.length > 0) {
	console.log(
		`==> not built, leaving as is: ${skipped.map(({ prefix }) => prefix).join(", ")}`,
	);
}
if (built.length === 0) {
	fail("dist/ holds nothing to sync. Run `pnpm run build` first.");
}

await SYNCS[targetEnv](built);
