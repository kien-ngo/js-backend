import "dotenv/config";
import { defineConfig } from "drizzle-kit";
import { envs } from "./src/lib/envs";

export default defineConfig({
	out: "./migrations",
	schema: "./src/database/schema.ts",
	dialect: "postgresql",
	dbCredentials: {
		url: envs.DATABASE_URL,
	},
});
