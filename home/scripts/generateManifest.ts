import {
	existsSync,
	mkdirSync,
	readdirSync,
	readFileSync,
	writeFileSync,
} from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "yaml";

// Slidev parses the headmatter with this same package.

type Deck = {
	name: string;
	title: string;
	date: string;
	event: string;
	eventLink: string | undefined;
	order: number;
};

type EventGroup = {
	date: string;
	event: string;
	eventLink: string | undefined;
	decks: Deck[];
};

const homeDir = join(dirname(fileURLToPath(import.meta.url)), "..");
const slidevDir = join(homeDir, "..", "slidev");
const outputPath = join(homeDir, "generated", "manifest.ts");

const DATE = /^\d{4}\/\d{2}\/\d{2}$/;
const URL_PREFIX = /^https?:\/\//;

const errors: string[] = [];

const report = (name: string, message: string) => {
	errors.push(`slidev/${name}/slides.md: ${message}`);
};

const fail = (): never => {
	for (const error of errors) console.error(error);
	process.exit(1);
};

// An unquoted value is truncated at a ' #' and stays a non-empty string.
const UNQUOTED = /^(title|date|event|eventLink):\s*([^'"\s].*)$/;

const checkComment = (name: string, line: string) => {
	const match = line.match(UNQUOTED);
	if (match !== null && / #/.test(match[2])) {
		report(name, `quote the value of ${match[1]}, a ' #' would start a comment`);
	}
};

// Only the leading block is the headmatter; every later `---` starts a slide.
const readHeadmatter = (
	name: string,
	path: string,
): Record<string, unknown> | null => {
	const lines = readFileSync(path, "utf8").split("\n");
	if (lines[0] !== "---") {
		report(name, "does not start with a headmatter block");
		return null;
	}
	const end = lines.indexOf("---", 1);
	if (end === -1) {
		report(name, "the headmatter block is never closed");
		return null;
	}
	const block = lines.slice(1, end);
	for (const line of block) checkComment(name, line);
	return parse(block.join("\n")) ?? {};
};

const text = (
	name: string,
	headmatter: Record<string, unknown>,
	key: string,
): string | null => {
	const value = headmatter[key];
	if (typeof value !== "string" || value.trim() === "") {
		report(
			name,
			`${key} must be a non-empty string, got ${JSON.stringify(value)}`,
		);
		return null;
	}
	return value;
};

const readDeck = (name: string): Deck | null => {
	const path = join(slidevDir, name, "slides.md");
	if (!existsSync(path)) return null;

	const headmatter = readHeadmatter(name, path);
	if (headmatter === null) return null;

	const title = text(name, headmatter, "title");
	const event = text(name, headmatter, "event");
	const date = text(name, headmatter, "date");
	if (title === null || event === null || date === null) return null;

	if (!DATE.test(date)) {
		report(
			name,
			`date must look like 'YYYY/MM/DD', got ${JSON.stringify(date)}`,
		);
		return null;
	}

	const eventLink = headmatter.eventLink;
	if (
		eventLink !== undefined &&
		(typeof eventLink !== "string" || !URL_PREFIX.test(eventLink))
	) {
		report(
			name,
			`eventLink must be an http(s) URL, got ${JSON.stringify(eventLink)}`,
		);
		return null;
	}

	const order = headmatter.order === undefined ? 0 : headmatter.order;
	if (typeof order !== "number") {
		report(name, `order must be a number, got ${JSON.stringify(order)}`);
		return null;
	}

	return { name, title, date, event, eventLink, order };
};

const decks = readdirSync(slidevDir, { withFileTypes: true })
	.filter((entry) => entry.isDirectory())
	.map((entry) => readDeck(entry.name))
	.filter((deck) => deck !== null);

// Grouping reads the values, so nothing may be missing by this point.
if (errors.length > 0) fail();

const groups = new Map<string, EventGroup>();
for (const deck of decks) {
	const key = `${deck.date} ${deck.event}`;
	const group = groups.get(key);
	if (group === undefined) {
		groups.set(key, {
			date: deck.date,
			event: deck.event,
			eventLink: deck.eventLink,
			decks: [deck],
		});
		continue;
	}
	// Letting the first deck win would drop the other one's link without a word.
	if (group.eventLink !== deck.eventLink) {
		report(
			deck.name,
			`eventLink disagrees with the other decks of ${deck.event}`,
		);
	}
	group.decks.push(deck);
}

if (errors.length > 0) fail();

const sorted = [...groups.values()]
	.sort((a, b) => b.date.localeCompare(a.date) || a.event.localeCompare(b.event))
	.map((group) => ({
		...group,
		decks: group.decks.sort(
			(a, b) => a.order - b.order || a.name.localeCompare(b.name),
		),
	}));

const string = (value: string) => JSON.stringify(value);

const groupLiteral = (group: EventGroup) => {
	const lines = [
		`\t{`,
		`\t\tdate: ${string(group.date)},`,
		`\t\tevent: ${string(group.event)},`,
	];
	if (group.eventLink !== undefined) {
		lines.push(`\t\teventLink: ${string(group.eventLink)},`);
	}
	lines.push(`\t\tslides: [`);
	for (const deck of group.decks) {
		lines.push(
			`\t\t\t{ name: ${string(deck.name)}, title: ${string(deck.title)} },`,
		);
	}
	lines.push(`\t\t],`, `\t},`);
	return lines.join("\n");
};

const titleEntries = sorted
	.flatMap((group) => group.decks)
	.map((deck) => `\t${string(deck.name)}: ${string(deck.title)},`)
	.join("\n");

const output = `// Generated by home/scripts/generateManifest.ts. Do not edit.

export type SlideEntry = { name: string; title: string };

export type EventGroup = {
	date: string;
	event: string;
	eventLink?: string;
	slides: SlideEntry[];
};

export const manifest: EventGroup[] = [
${sorted.map(groupLiteral).join("\n")}
];

export const slideTitles: Record<string, string | undefined> = {
${titleEntries}
};
`;

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, output);
console.log(`generated ${decks.length} decks in ${sorted.length} events`);
