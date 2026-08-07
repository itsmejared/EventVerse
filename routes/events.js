import express from "express";
import {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/events.js";
import { validateEvent, validateId } from "../middleware/validate.js";
import isAuthenticated from "../middleware/isAuthenticated.js";


const router = express.Router();

router.get("/", getAllEvents);
router.get("/:id", validateId, getEventById);
router.post("/", isAuthenticated, validateEvent, createEvent);
router.put("/:id", validateId, isAuthenticated, validateEvent, updateEvent);
router.delete("/:id", validateId, isAuthenticated, deleteEvent);

export default router;
