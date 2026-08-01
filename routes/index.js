import express from "express";
import eventsRoutes from "./events.js";
import venuesRoutes from "./venues.js";

const router = express.Router();

router.get("/", (req, res) => {
  // #swagger.ignore = true
  res.redirect("/api-docs");
});

router.use("/events", eventsRoutes);
router.use("/venues", venuesRoutes);

export default router;
