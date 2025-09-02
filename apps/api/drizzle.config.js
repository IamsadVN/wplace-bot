import { defineConfig } from "drizzle-kit";

export default defineConfig({
	out: "./drizzle",
	schema: "./src/database/schema/index.js",
	dialect: "mysql",
	dbCredentials: {
		url: process.env.DATABASE_URL
	}
});