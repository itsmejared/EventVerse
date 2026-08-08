import express from "express";
import {
  getAllVenues,
  getVenueById,
  createVenue,
  updateVenue,
  deleteVenue,
} from "../controllers/venues.js";
import { validateVenue, validateId } from "../middleware/validate.js";
import pkg from "express-openid-connect";

const { requiresAuth } = pkg;
const router = express.Router();

// PUBLIC ROUTES (No login required)
router.get("/", getAllVenues);
router.get("/:id", validateId, getVenueById);

// PROTECTED ROUTES (Requires active Auth0 session)
router.post("/", requiresAuth(), validateVenue, createVenue);
router.put("/:id", requiresAuth(), validateId, validateVenue, updateVenue);
router.delete("/:id", requiresAuth(), validateId, deleteVenue);

export default router;
