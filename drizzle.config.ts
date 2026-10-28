import { defineConfig } from "drizzle-kit";

// Used by `npx drizzle-kit push` to create/update the site_settings table
// on your Neon database. Needs DATABASE_URL set in .env (or .env.local).
export default defineConfig({
  schema: "./src/lib/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
