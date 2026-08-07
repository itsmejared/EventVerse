import request from "supertest";
import app from "../server.js";
import { initDb } from "../database/connection.js";

describe("Events API Unit Tests (GET endpoints)", () => {
  beforeAll((done) => {
    initDb((err) => {
      if (err) {
        done(err);
      } else {
        done();
      }
    });
  });

  describe("GET /events endpoints", () => {
    let sampleEventId = "";

    test("GET /events - Should return HTTP 200 and an array of events", async () => {
      const res = await request(app).get("/events");
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);

      if (res.body.length > 0) {
        sampleEventId = res.body[0]._id || res.body[0].id;
      }
    });

    test("GET /events/:id - Should return HTTP 200 for a valid existing ID", async () => {
      if (!sampleEventId) return;
      const res = await request(app).get(`/events/${sampleEventId}`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("title");
      expect(res.body).toHaveProperty("category");
    });

    test("GET /events/:id - Should return 400 or 404 for an invalid or non-existent ID", async () => {
      const res = await request(app).get("/events/invalidid123456");
      expect([400, 404]).toContain(res.statusCode);
    });
  });
});
