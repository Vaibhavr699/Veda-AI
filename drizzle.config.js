import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./configs/schema.js",
  dbCredentials: { url: "postgresql://neondb_owner:npg_JisMjl8W6Hom@ep-raspy-poetry-a5tvvivy-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require" },
});
