import { defineConfig } from "drizzle-kit"

// Schema for the Better Auth tables (user/session/account/verification).
// Run `pnpm --filter storefront db:push` to create them in the Neon database.
export default defineConfig({
  schema: "./lib/auth/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
})
