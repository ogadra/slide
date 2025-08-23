import { Hono } from "hono";


export const iOSSafariAppExperience = new Hono();

iOSSafariAppExperience.get('/', (c) => {
  return c.text('iOS Safari App Experience Demo');
});
