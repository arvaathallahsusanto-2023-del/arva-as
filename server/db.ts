import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema.js";

const { Pool } = pg;

// Prevent crashing for local UI development when database is not set
let pool: any = null;
let db: any = {};

if (process.env.DATABASE_URL) {
  pool = new Pool({ connectionString: process.env.DATABASE_URL });
  db = drizzle(pool, { schema });
} else {
  console.warn("⚠️ DATABASE_URL is not set. Database features will not work, but UI can still be previewed.");
}

export { pool, db };
