import { defineConfig, devices } from "@playwright/test";
import { env } from "@plugins/globalSetup";

export default defineConfig({
  testDir: "./testCases",
  testMatch: "**/*.spec.ts",
  timeout: 60_000,
  fullyParallel: false,
  retries: process.env.CI ? 2 : 0,
  reporter: [["line"], ["html", { open: "never" }], ["json", { outputFile: "./test-results/test-results.json" }]],
  globalSetup: "./src/plugins/globalSetup.ts",
  use: {
    baseURL: env.BASE_URL,
    trace: "on",
    screenshot: "on",
    testIdAttribute: "data-test",
    ...devices["Desktop Chrome"],
    launchOptions: {
      slowMo: env.SLOWMO,
    },
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"], channel: "chromium" },
    },
  ],
});
