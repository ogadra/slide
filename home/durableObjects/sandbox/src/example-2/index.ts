import { Hono } from "hono";
import { Page } from "./page";

const app = new Hono<{
	Variables: { count: number };
}>();

let counter = 0;

app.get("/", (c) => {
	counter++;
	c.set("count", counter);
	return Page(c);
});

export default app;
