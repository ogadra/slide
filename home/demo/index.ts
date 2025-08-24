import { Hono } from "hono";
import { iOSSafariAppExperience } from "./ios-safari-app-experience";
import { App } from "./app";

export const demo = new Hono();

demo.on("GET",["/"], async (c) => App(c));

demo.route('/ios-safari-app-experience', iOSSafariAppExperience);

