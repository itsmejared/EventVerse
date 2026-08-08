import express from "express";
import {
  getAllTickets,
  getTicketById,
  createTicket,
  updateTicket,
  deleteTicket,
} from "../controllers/tickets.js";
import { validateTicket, validateId } from "../middleware/validate.js";
import pkg from "express-openid-connect";

const { requiresAuth } = pkg;
const router = express.Router();

// PUBLIC ROUTES (No login required)
router.get("/", getAllTickets);
router.get("/:id", validateId, getTicketById);

// PROTECTED ROUTES (Requires active Auth0 session)
router.post("/", requiresAuth(), validateTicket, createTicket);
router.put("/:id", requiresAuth(), validateId, validateTicket, updateTicket);
router.delete("/:id", requiresAuth(), validateId, deleteTicket);

export default router;
