import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    projects: [
      "./server/vitest.config.ts",
      "./client/vitest.config.happy-dom.js",
      "./client/vitest.config.browser.js",
    ],
  },
});
