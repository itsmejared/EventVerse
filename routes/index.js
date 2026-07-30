import express from "express";
import venuesRoutes from "./venues.js";

const router = express.Router();

router.use("/venues", venuesRoutes);

export default router;
