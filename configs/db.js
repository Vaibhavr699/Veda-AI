import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

// Ensure environment variable is loaded
if (!process.env.NEXT_PUBLIC_DATABASE_CONNECTION_STRING) {
  throw new Error("DATABASE_URL is not defined in the environment variables!");
}

const sql = neon(process.env.NEXT_PUBLIC_DATABASE_CONNECTION_STRING);
export const db = drizzle(sql);