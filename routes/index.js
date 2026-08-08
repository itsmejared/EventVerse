import express from "express";
import eventsRoutes from "./events.js";
import venuesRoutes from "./venues.js";
import ticketsRoutes from "./tickets.js";
import reviewsRoutes from "./reviews.js";

const router = express.Router();

router.get("/", (req, res) => {
  // #swagger.ignore = true
  res.redirect("/api-docs");
});

router.use("/events", eventsRoutes);
router.use("/venues", venuesRoutes);
router.use("/tickets", ticketsRoutes);
router.use("/reviews", reviewsRoutes);
export default router;
