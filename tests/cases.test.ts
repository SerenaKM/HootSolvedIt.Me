import request from "supertest";
import app from "../src/server.ts";
import env from "../env.ts";
import { createTestCase, cleanupDatabase } from "./setup/dbHelpers.ts";

describe("Case Endpoints", () => {
  afterEach(async () => {
    await cleanupDatabase();
  });

  describe("GET /api/cases", () => {
    it("should get all cases", async () => {
      const { id, background } = await createTestCase();

      const response = await request(app).get("/api/cases");

      expect(response.status).toBe(201);
      expect(response.body.background.length).toBeGreaterThan(0);
    });
  });
});
