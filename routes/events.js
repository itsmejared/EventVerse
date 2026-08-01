import express from "express";
import {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/events.js";
import { validateEvent, validateId } from "../middleware/validate.js";

const router = express.Router();

router.get("/", getAllEvents);
router.get("/:id", validateId, getEventById);
router.post("/", validateEvent, createEvent);
router.put("/:id", validateId, validateEvent, updateEvent);
router.delete("/:id", validateId, deleteEvent);

export default router;
