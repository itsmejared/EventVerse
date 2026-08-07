import request from "supertest";
import app from "../server.js";
import { initDb } from "../database/connection.js";

describe("Venues API Unit Tests (GET endpoints)", () => {
  beforeAll(async () => {
    await initDb();
  });

  describe("GET /venues endpoints", () => {
    let sampleVenueId = "";

    test("GET /venues - Should return HTTP 200 and an array of venues", async () => {
      const res = await request(app).get("/venues");
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);

      if (res.body.length > 0) {
        sampleVenueId = res.body[0]._id || res.body[0].id;
      }
    });

    test("GET /venues/:id - Should return HTTP 200 for a valid existing ID", async () => {
      if (!sampleVenueId) return;
      const res = await request(app).get(`/venues/${sampleVenueId}`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("name");
      expect(res.body).toHaveProperty("city");
    });

    test("GET /venues/:id - Should return 400 or 404 for an invalid or non-existent ID", async () => {
      const res = await request(app).get("/venues/invalidid123456");
      expect([400, 404]).toContain(res.statusCode);
    });
  });
});
