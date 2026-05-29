import { defineConfig } from "drizzle-kit"

// Better Auth tables shared with dashboard/storefront, plus the `apikey` table
// used by the API app's @better-auth/api-key plugin. Run
// `pnpm --filter api db:push` to sync them in the Neon database.
export default defineConfig({
  schema: "./lib/auth/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
})
