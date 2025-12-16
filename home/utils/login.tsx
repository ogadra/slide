/** @jsx jsx */
/** @jsxImportSource hono/jsx */

import { compare } from "bcrypt-ts";
import type { Context } from "hono";
import { getCookie, setCookie } from "hono/cookie";
import {
	AUTH_COOKIE_NAME,
	SESSION_TTL,
	generateSessionToken,
	verifySessionToken,
} from "./auth";

export const LoginPage = (c: Context, error?: string) => {
	return c.html(
		<html lang="ja">
			<head>
				<meta charset="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>Login - ogadra's slides</title>
				<style>{`
					body {
						font-family: system-ui, sans-serif;
						display: flex;
						justify-content: center;
						align-items: center;
						min-height: 100vh;
						margin: 0;
						background: #1a1a2e;
						color: #eee;
					}
					.login-form {
						background: #16213e;
						padding: 2rem;
						border-radius: 8px;
						box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
					}
					h1 {
						margin: 0 0 1.5rem;
						font-size: 1.5rem;
					}
					input[type="password"] {
						width: 100%;
						padding: 0.75rem;
						border: 1px solid #0f3460;
						border-radius: 4px;
						background: #1a1a2e;
						color: #eee;
						font-size: 1rem;
						box-sizing: border-box;
					}
					button {
						width: 100%;
						padding: 0.75rem;
						margin-top: 1rem;
						background: #e94560;
						color: white;
						border: none;
						border-radius: 4px;
						font-size: 1rem;
						cursor: pointer;
					}
					button:hover {
						background: #ff6b6b;
					}
					.error {
						color: #ff6b6b;
						margin-bottom: 1rem;
						font-size: 0.9rem;
					}
				`}</style>
			</head>
			<body>
				<form class="login-form" method="post" action="/login">
					<h1>Presenter Login</h1>
					{error && <p class="error">{error}</p>}
					<input
						type="password"
						name="password"
						placeholder="Password"
						required
						autofocus
					/>
					<button type="submit">Login</button>
				</form>
			</body>
		</html>,
	);
};

export const handleLogin = async (c: Context): Promise<Response> => {
	const formData = await c.req.formData();
	const password = formData.get("password");

	if (typeof password !== "string") {
		return LoginPage(c, "Password is required");
	}

	const storedHash = c.env.AUTH_PASSWORD_HASH;
	const isValid = await compare(password, storedHash);

	if (!isValid) {
		return LoginPage(c, "Invalid password");
	}

	const sessionToken = generateSessionToken();
	await c.env.SESSION_KV.put(sessionToken, "valid", { expirationTtl: SESSION_TTL });

	setCookie(c, AUTH_COOKIE_NAME, sessionToken, {
		httpOnly: true,
		secure: true,
		sameSite: "Strict",
		path: "/",
		maxAge: SESSION_TTL,
	});

	return c.redirect("/");
};

export const verifyAuth = async (c: Context): Promise<boolean> => {
	const token = getCookie(c, AUTH_COOKIE_NAME) ?? null;
	return verifySessionToken(token, c.env.SESSION_KV);
};
