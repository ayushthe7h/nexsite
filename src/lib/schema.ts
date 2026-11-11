// Drizzle ORM schema for the site's Postgres database (Neon).
// Only one table exists right now: a single-row "site_settings" store
// that replaces the old localStorage-only settings so maintenance mode,
// the announcement banner, etc. are actually shared across every visitor
// instead of only existing in the admin's own browser.
import { pgTable, integer, jsonb, text, timestamp } from "drizzle-orm/pg-core";

export const siteSettings = pgTable("site_settings", {
  // Always 1 - this is a singleton row, not a per-user table.
  id: integer("id").primaryKey(),
  data: jsonb("data").notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

// Staff passcode for /panel sign-in and settings writes. Also a singleton
// row (id always 1) - see src/lib/admin-auth.ts for how it's read/written.
// Stored as a salted scrypt hash, never plaintext.
export const adminAuth = pgTable("admin_auth", {
  id: integer("id").primaryKey(),
  passcodeHash: text("passcode_hash").notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});
