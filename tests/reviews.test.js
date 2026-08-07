import request from "supertest";
import app from "../server.js";
import { initDb } from "../database/connection.js";

describe("Reviews API Unit Tests (GET endpoints)", () => {
  beforeAll(async () => {
    await initDb();
  });

  describe("GET /reviews endpoints", () => {
    let sampleReviewId = "";

    test("GET /reviews - Should return HTTP 200 and an array of reviews", async () => {
      const res = await request(app).get("/reviews");
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);

      if (res.body.length > 0) {
        sampleReviewId = res.body[0]._id || res.body[0].id;
      }
    });

    test("GET /reviews/:id - Should return HTTP 200 for a valid existing ID", async () => {
      if (!sampleReviewId) return;
      const res = await request(app).get(`/reviews/${sampleReviewId}`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("rating");
      expect(res.body).toHaveProperty("comment");
    });

    test("GET /reviews/:id - Should return 400 or 404 for an invalid or non-existent ID", async () => {
      const res = await request(app).get("/reviews/invalidid123456");
      expect([400, 404]).toContain(res.statusCode);
    });
  });
});
