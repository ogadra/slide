import { Hono } from "hono";
import { iOSSafariAppExperience } from "./ios-safari-app-experience";

export const demo = new Hono();

demo.route('/ios-safari-app-experience', iOSSafariAppExperience);

