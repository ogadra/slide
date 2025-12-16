import type { KVNamespace } from "@cloudflare/workers-types";

interface JsonStringifyable {
	[key: string]:
		| string
		| string[]
		| number
		| boolean
		| JsonStringifyable
		| JsonStringifyable[]
		| null;
}

/**
 *
 * @param c Context
 * @param keyPrefix string // type:targetId
 * @param userId string
 * @param content JsonStringifyable
 * @returns
 */
export const ipLogger = async (
	ipLog: KVNamespace,
	req: Request,
	keyPrefix: string,
	content: JsonStringifyable,
) => {
	const timeStamp: string =
		String(req.headers.get("ogadra-timestamp-sec")) +
		String(req.headers.get("ogadra-timestamp-msec")).padStart(3, "0");
	const key = `${keyPrefix}:${timeStamp}`;
	const value = {
		ipAddr: req.headers.get("x-real-ip"),
		port: req.headers.get("ogadra-client-port"),
		timeStamp: timeStamp,
		content,
	};
	try {
		await ipLog.put(key, JSON.stringify(value));
	} catch (e) {
		if (e instanceof TypeError) {
			return;
		}
		throw e;
	}
	return;
};
