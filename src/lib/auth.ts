import { betterAuth } from "better-auth";
import { Redis } from "ioredis";
import { envs } from "./envs";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../database/db";
import * as schema from "../database/schema";

const redis = new Redis(`${process.env.REDIS_URL}?family=0`)
	.on("error", (err) => {
		// console.error("Redis connection error:", err);
	})
	.on("connect", () => {
		// console.log("Redis connected");
	})
	.on("ready", () => {
		// console.log("Redis ready");
	});

const secondaryStorage =
	envs.ENABLE_REDIS === "true"
		? {
				get: async (key) => {
					const value = await redis.get(key);
					return value ? value : null;
				},
				set: async (key, value, ttl) => {
					if (ttl) {
						await redis.set(key, value, "EX", ttl);
					} else {
						await redis.set(key, value);
					}
				},
				delete: async (key) => {
					await redis.del(key);
				},
			}
		: undefined;

// Check better-auth docs for more info https://www.better-auth.com/docs/
export const auth = betterAuth({
	emailAndPassword: {
		enabled: true,
	},
	// Session config
	session: {
		cookieCache: {
			enabled: true,
			maxAge: 5 * 60,
		},
	},
	// DB config
	database: drizzleAdapter(db, {
		provider: "pg",
		schema,
	}),
	secondaryStorage,
});
