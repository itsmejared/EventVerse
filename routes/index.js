import express from "express";
import eventsRoutes from "./events.js";
import venuesRoutes from "./venues.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send(`
    <div style="font-family: sans-serif; text-align: center; margin-top: 10%;">
      <h1>Shopix API</h1>
      <p><b>EventVerse API</b> is a RESTful backend web service designed for managing live events, venues, ticket sales, and attendee reviews. Built with Node.js, Express, MongoDB Atlas, and Auth0 for CSE341 (Web Services).</p>
      <a href="/api-docs" style="display: inline-block; background: #85ea2d; color: #000; padding: 10px 20px; text-decoration: none; border-radius: 4px; font-weight: bold;">Go to Swagger UI</a>
    </div>
  `);
});

router.use("/events", eventsRoutes);
router.use("/venues", venuesRoutes);

export default router;
