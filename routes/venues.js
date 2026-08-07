// routes/venues.js
import express from "express";
import {
  getAllVenues,
  getVenueById,
  createVenue,
  updateVenue,
  deleteVenue,
} from "../controllers/venues.js";
import { validateVenue } from "../middleware/validate.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

router.get("/", getAllVenues);
router.get("/:id", getVenueById);
router.post("/", isAuthenticated, validateVenue, createVenue);
router.put("/:id", isAuthenticated, validateVenue, updateVenue);
router.delete("/:id", isAuthenticated, deleteVenue);

export default router;
