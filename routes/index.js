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

router.get("/auth-status", (req, res) => {
  // #swagger.ignore = true
  if (req.oidc.isAuthenticated()) {
    res.json({
      isAuthenticated: true,
      user: {
        name: req.oidc.user.name || req.oidc.user.nickname || req.oidc.user.email,
        email: req.oidc.user.email,
      },
    });
  } else {
    res.json({
      isAuthenticated: false,
      user: null,
    });
  }
});

router.use("/events", eventsRoutes);
router.use("/venues", venuesRoutes);
router.use("/tickets", ticketsRoutes);
router.use("/reviews", reviewsRoutes);
export default router;
