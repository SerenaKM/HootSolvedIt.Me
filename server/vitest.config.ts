import { defineProject } from "vitest/config";

export default defineProject({
  test: {
    name: "server",
    globals: true, // add testing functions to global space
    globalSetup: ["./src/tests/setup/globalSetup.ts"],
    // Automatically clean up after each test to ensure isolation
    clearMocks: true,
    restoreMocks: true,
    // Ensure tests run sequentially to avoid database conflicts
    pool: "threads",
    maxWorkers: 1,
    isolate: false,
    include: ["./src/**/*.{test,spec}.{js,jsx,ts,tsx}"],
  },
  plugins: [],
});
