import { cloudflareTest, readD1Migrations } from "@cloudflare/vitest-plugin";
import { defineConfig } from "vitest/config";

export default defineConfig(async () => ({
  plugins: [
    cloudflareTest({
      main: "./src/index.ts",
      miniflare: {
        compatibilityDate: "2026-08-01",
        compatibilityFlags: ["nodejs_compat"],
        d1Databases: ["DB"],
        r2Buckets: ["FILES"],
        bindings: {
          TEST_MIGRATIONS: await readD1Migrations("./drizzle/migrations"),
          ENVIRONMENT: "development",
          API_KEY: "test-api-key",
          ADMIN_EMAIL: "admin@example.test",
          ADMIN_PASSWORD: "test-admin-password-123",
          BETTER_AUTH_URL: "http://localhost:5173",
          BETTER_AUTH_SECRET: "test-only-secret-not-for-deployment-123456789",
          EMAIL_MODE: "resend",
          EMAIL_FROM: "Test <test@example.com>",
          RESEND_API_KEY: "test-resend-key",
          ENABLE_ORGANIZATIONS: "true",
        },
      },
    }),
  ],
  test: {
    include: ["tests/**/*.test.ts"],
    setupFiles: ["./tests/setup.ts"],
    testTimeout: 30_000,
    hookTimeout: 30_000,
    fileParallelism: false,
  },
}));
