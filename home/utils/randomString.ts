import { customAlphabet } from "nanoid";

const ALPHABET = "abcdefghijklmnopqrstuvwxyz0123456789";
const DEFAULT_LENGTH = 21;

export const randomString = (length = DEFAULT_LENGTH) =>
	customAlphabet(ALPHABET, length)();
