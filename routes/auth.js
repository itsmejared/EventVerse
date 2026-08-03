import { Router } from "express";
import passport from "../passport.js";

const router = Router();

router.get("/login", (req, res, next) => {
  // #swagger.ignore = true
  passport.authenticate("github", { scope: ["user:email"] })(req, res, next);
});

router.get("/callback", (req, res, next) => {
  // #swagger.ignore = true
  passport.authenticate("github", {
    failureRedirect: "/api-docs",
    successRedirect: "/api-docs",
  })(req, res, next);
});

router.get("/logout", (req, res, next) => {
  // #swagger.ignore = true
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/api-docs");
  });
});

router.get("/user", (req, res) => {
  if (req.isAuthenticated()) {
    return res.status(200).json({
      message: "You are logged in",
      user: req.user,
    });
  }

  res.status(401).json({
    message: "You are not logged in",
  });
});

export default router;
