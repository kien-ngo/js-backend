import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const envs = createEnv({
	server: {
		DATABASE_URL: z.string().url(),
		REDIS_URL: z.string().url(),
		BETTER_AUTH_SECRET: z.string().min(1),
		BETTER_AUTH_URL: z.string().url(),
		ENABLE_REDIS: z.enum(["true", "false"]),
	},

	/**
	 * What object holds the environment variables at runtime. This is usually
	 * `process.env` or `import.meta.env`.
	 */
	runtimeEnv: process.env,
	emptyStringAsUndefined: true,
});
