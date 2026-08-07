import request from "supertest";
import app from "../server.js";
import { initDb } from "../database/connection.js";

describe("Tickets API Unit Tests (GET endpoints)", () => {
  beforeAll((done) => {
    initDb((err) => {
      if (err) {
        done(err);
      } else {
        done();
      }
    });
  });

  describe("GET /tickets endpoints", () => {
    let sampleTicketId = "";

    test("GET /tickets - Should return HTTP 200 and an array of tickets", async () => {
      const res = await request(app).get("/tickets");
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);

      if (res.body.length > 0) {
        sampleTicketId = res.body[0]._id || res.body[0].id;
      }
    });

    test("GET /tickets/:id - Should return HTTP 200 for a valid existing ID", async () => {
      if (!sampleTicketId) return;
      const res = await request(app).get(`/tickets/${sampleTicketId}`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("pricePaid");
    });

    test("GET /tickets/:id - Should return 400 or 404 for an invalid or non-existent ID", async () => {
      const res = await request(app).get("/tickets/invalidid123456");
      expect([400, 404]).toContain(res.statusCode);
    });
  });
});
