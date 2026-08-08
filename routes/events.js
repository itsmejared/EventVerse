import express from "express";
import {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/events.js";
import { validateEvent, validateId } from "../middleware/validate.js";
import pkg from "express-openid-connect";

const { requiresAuth } = pkg;
const router = express.Router();

// PUBLIC ROUTES (No login required)
router.get("/", getAllEvents);
router.get("/:id", getEventById);

// PROTECTED ROUTES (Requires active Auth0 session)
router.post("/", requiresAuth(), createEvent);
router.put("/:id", requiresAuth(), updateEvent);
router.delete("/:id", requiresAuth(), deleteEvent);

export default router;
