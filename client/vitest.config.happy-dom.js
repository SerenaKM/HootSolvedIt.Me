import { defineProject } from "vitest/config";

export default defineProject({
  test: {
    name: "client-happy-dom",
    include: ["src/__tests__/*.node.test.{js, jsx}"],
    environment: "happy-dom",
    coverage: {
      provider: "istanbul",
      reporter: ["text", "json", "html"],
    },
  },
});
