import express from "express";
import eventsRoutes from "./events.js";
import venuesRoutes from "./venues.js";
import ticketsRoutes from "./tickets.js";
import reviewsRoutes from "./reviews.js";
import authRoutes from "./auth.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

router.get("/", (req, res) => {
  // #swagger.ignore = true
  res.redirect("/api-docs");
});

router.use("/auth", authRoutes);
router.use("/events", isAuthenticated, eventsRoutes);
router.use("/venues", isAuthenticated, venuesRoutes);
router.use("/tickets", isAuthenticated, ticketsRoutes);
router.use("/reviews", isAuthenticated, reviewsRoutes);
export default router;
