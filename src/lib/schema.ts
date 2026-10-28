// Drizzle ORM schema for the site's Postgres database (Neon).
// Only one table exists right now: a single-row "site_settings" store
// that replaces the old localStorage-only settings so maintenance mode,
// the announcement banner, etc. are actually shared across every visitor
// instead of only existing in the admin's own browser.
import { pgTable, integer, jsonb, timestamp } from "drizzle-orm/pg-core";

export const siteSettings = pgTable("site_settings", {
  // Always 1 - this is a singleton row, not a per-user table.
  id: integer("id").primaryKey(),
  data: jsonb("data").notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});
