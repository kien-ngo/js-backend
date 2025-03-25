import { Hono } from "hono";
import { auth } from "./lib/auth";
import { logger } from "hono/logger";
const app = new Hono();

app.use(logger());

app.get("/", (c) => {
	return c.text("Hello Hono!");
});

app.get("/health", (c) => {
	return c.json({
		status: "ok",
		timestamp: new Date().toISOString(),
	});
});

/**
 * Better Auth routes, see docs before changing
 * @link https://better-auth.com/docs
 */
app.on(["POST", "GET"], "/api/auth/**", (c) => auth.handler(c.req.raw));

export default {
	// Change this value to the port of your choice
	// generally I would avoid 3000 because most frontend app runs at that port when doing local dev
	// also make sure to change BETTER_AUTH_URL's port should this value is updated
	port: 4000,
	fetch: app.fetch,
};
