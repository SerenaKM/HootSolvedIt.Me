import { defineProject } from "vitest/config";
import { playwright } from "@vitest/browser-playwright";

export default defineProject({
  test: {
    name: "client-browser",
    setupFiles: ["vitest-browser-react"],
    include: ["src/__tests__/*.browser.test.{js, jsx}"],
    browser: {
      provider: playwright,
      enabled: true,
      instances: [{ browser: "chromium" }],
    },
    coverage: {
      provider: "istanbul",
      reporter: ["text", "json", "html"],
    },
  },
});
