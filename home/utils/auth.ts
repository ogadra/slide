export const AUTH_COOKIE_NAME = "slide_auth";
export const SESSION_TTL = 60 * 60 * 24 * 7; // 1 week in seconds

export const generateSessionToken = (): string => {
	const array = new Uint8Array(32);
	crypto.getRandomValues(array);
	return Array.from(array)
		.map((b) => b.toString(16).padStart(2, "0"))
		.join("");
};

export const getSessionTokenFromRequest = (request: Request): string | null => {
	const cookie = request.headers.get("Cookie");
	if (!cookie) return null;

	const authCookie = cookie
		.split(";")
		.map((c) => c.trim())
		.find((c) => c.startsWith(`${AUTH_COOKIE_NAME}=`));

	if (!authCookie) return null;
	return authCookie.split("=")[1] ?? null;
};

export const verifySessionToken = async (
	token: string | null,
	kv: KVNamespace,
): Promise<boolean> => {
	if (!token) return false;
	const session = await kv.get(token);
	return session === "valid";
};
