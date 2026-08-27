import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { manifest } from "../home/generated/manifest.ts";

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "..");

const fail: (message: string) => never = (message) => {
	console.error(message);
	process.exit(1);
};

// The tests read the same entry, so the deck they open is the deck that got built.
const deck = manifest[0]?.slides[0]?.name;
if (deck === undefined) {
	fail("the manifest holds no decks, so there is nothing to open");
}

const run = (...args: string[]) => {
	console.log(`==> pnpm ${args.join(" ")}`);
	const { status, error } = spawnSync("pnpm", args, {
		cwd: repoRoot,
		stdio: "inherit",
	});
	if (error) {
		fail(`failed to run pnpm ${args.join(" ")}: ${error.message}`);
	}
	if (status !== 0) {
		fail(`pnpm ${args.join(" ")} exited with ${status}`);
	}
};

// The homepage links a slides-export thumbnail, so the deck needs its PNGs too.
run("--filter", deck, "run", "build:slidev");
run("--filter", deck, "run", "build:png");
run("--filter", "slide-home", "run", "build");
run("run", "sync:local");

console.log(`==> ${deck} is seeded and ready to serve`);
