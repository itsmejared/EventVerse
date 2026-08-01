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

const router = express.Router();

router.get("/", getAllVenues);
router.get("/:id", getVenueById);
router.post("/", validateVenue, createVenue);
router.put("/:id", validateVenue, updateVenue);
router.delete("/:id", deleteVenue);

export default router;
