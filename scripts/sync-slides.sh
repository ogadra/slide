#!/usr/bin/env bash
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

usage() {
	cat <<'EOS'
Usage: ./scripts/sync-slides.sh --env prd|dev (--all | <slide-name>...)

Builds the given slide decks and syncs dist/<slide-name> to the R2 bucket.

Options:
  --env prd|dev   Target environment (prd: slide-decks, dev: slide-decks-dev)
  --all           Sync every deck under slidev/
  --dry-run       Build as usual, but let rclone only report what it would do
  -h, --help      Show this help

Required environment variables:
  R2_ACCOUNT_ID
  R2_ACCESS_KEY_ID
  R2_SECRET_ACCESS_KEY
EOS
}

target_env=""
sync_all=false
dry_run=false
slides=()

while [[ $# -gt 0 ]]; do
	case "$1" in
		--env)
			target_env="${2-}"
			shift 2
			;;
		--all)
			sync_all=true
			shift
			;;
		--dry-run)
			dry_run=true
			shift
			;;
		-h | --help)
			usage
			exit 0
			;;
		-*)
			echo "unknown option: $1" >&2
			usage >&2
			exit 1
			;;
		*)
			slides+=("$1")
			shift
			;;
	esac
done

case "$target_env" in
	prd) bucket="slide-decks" ;;
	dev) bucket="slide-decks-dev" ;;
	"")
		echo "--env is required" >&2
		usage >&2
		exit 1
		;;
	*)
		echo "--env must be prd or dev, got: $target_env" >&2
		exit 1
		;;
esac

if $sync_all && [[ ${#slides[@]} -gt 0 ]]; then
	echo "--all and slide names are mutually exclusive" >&2
	exit 1
fi

if ! $sync_all && [[ ${#slides[@]} -eq 0 ]]; then
	echo "specify --all or at least one slide name" >&2
	usage >&2
	exit 1
fi

if ! command -v rclone > /dev/null; then
	echo "rclone is not installed" >&2
	exit 1
fi

for var in R2_ACCOUNT_ID R2_ACCESS_KEY_ID R2_SECRET_ACCESS_KEY; do
	if [[ -z "${!var-}" ]]; then
		echo "environment variable $var is not set" >&2
		exit 1
	fi
done

cd "$REPO_ROOT"

if $sync_all; then
	for dir in slidev/*/; do
		slides+=("$(basename "$dir")")
	done
else
	for slide in "${slides[@]}"; do
		if [[ ! -d "slidev/$slide" ]]; then
			echo "no such slide: slidev/$slide" >&2
			exit 1
		fi
	done
fi

# Secrets go through the environment so they never show up in the process list.
export RCLONE_S3_PROVIDER="Cloudflare"
export RCLONE_S3_REGION="auto"
export RCLONE_S3_ENDPOINT="https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com"
export RCLONE_S3_ACCESS_KEY_ID="$R2_ACCESS_KEY_ID"
export RCLONE_S3_SECRET_ACCESS_KEY="$R2_SECRET_ACCESS_KEY"
# The sync token is scoped to the bucket and cannot list buckets.
export RCLONE_S3_NO_CHECK_BUCKET="true"

rclone_flags=(--checksum --progress)
if $dry_run; then
	rclone_flags+=(--dry-run)
fi

for slide in "${slides[@]}"; do
	echo "==> building $slide"
	pnpm --filter "$slide" build

	if [[ ! -d "dist/$slide" ]]; then
		echo "build produced no output at dist/$slide" >&2
		exit 1
	fi

	echo "==> syncing $slide to $bucket"
	rclone sync "dist/$slide" ":s3:${bucket}/${slide}" "${rclone_flags[@]}"
done

echo "==> done: ${#slides[@]} deck(s) synced to $bucket"
