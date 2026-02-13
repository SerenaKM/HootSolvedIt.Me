import { cleanupDatabase, createTestCase } from "./dbHelpers.ts";

describe("Test setup", () => {
  test("should connect to the test db", async () => {
    const { background } = await createTestCase();
    expect(background).toBeDefined();
    await cleanupDatabase;
  });
});
