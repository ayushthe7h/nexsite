// Server-only Postgres client (Neon's HTTP driver + Drizzle).
// Never imported by a "use client" component - only by Route Handlers.
//
// DATABASE_URL comes from your Neon project's connection string
// (Neon dashboard -> your project -> Connection Details). If it isn't
// set, isDbConfigured() returns false and callers fall back to safe
// defaults instead of crashing - same "works with zero config" philosophy
// as the Tebex checkout flag.
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

export function isDbConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

let _db: ReturnType<typeof drizzle<typeof schema>> | null = null;

export function getDb() {
  if (!isDbConfigured()) return null;
  if (!_db) {
    const sql = neon(process.env.DATABASE_URL!);
    _db = drizzle(sql, { schema });
  }
  return _db;
}
