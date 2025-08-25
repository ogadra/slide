import { Hono } from "hono";
import { renderer } from "./render";

export const iOSSafariAppExperience = new Hono();
iOSSafariAppExperience.use(renderer);

iOSSafariAppExperience.get("/", (c) => {
	return c.render(<div id="root"></div>);
});
