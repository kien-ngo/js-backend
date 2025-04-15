import { betterAuth } from "better-auth";
import { envs } from "./envs";
import { openAPI } from "better-auth/plugins";
import { Pool } from "pg";

// Available from Bun 1.2.9. "redis" reads the env REDIS_URL (or VALKEY_URL) directly
import { redis } from "bun";

const secondaryStorage =
	envs.ENABLE_REDIS === "true" && envs.REDIS_URL
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
	database: new Pool({
		connectionString: envs.DATABASE_URL,
	}),
	secondaryStorage,
	plugins: [openAPI()],
});
