import express from "express";
import eventsRoutes from "./events.js";
import venuesRoutes from "./venues.js";
import authRoutes from "./auth.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
import ticketsRoutes from './tickets.js';

const router = express.Router();

router.get("/", (req, res) => {
  // #swagger.ignore = true
  res.redirect("/api-docs");
});

router.use("/auth", authRoutes);
router.use("/events", isAuthenticated, eventsRoutes);
router.use("/venues", isAuthenticated, venuesRoutes);
router.use('/tickets', ticketsRoutes);
export default router;
