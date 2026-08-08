import express from "express";
import {
  getAllTickets,
  getTicketById,
  createTicket,
  updateTicket,
  deleteTicket,
} from "../controllers/tickets.js";
import { validateTicket } from "../middleware/validate.js";
import pkg from "express-openid-connect";

const { requiresAuth } = pkg;
const router = express.Router();

// PUBLIC ROUTES (No login required)
router.get("/", getAllTickets);
router.get("/:id", getTicketById);

// PROTECTED ROUTES (Requires active Auth0 session)
router.post("/", requiresAuth(), validateTicket, createTicket);
router.put("/:id", requiresAuth(), validateTicket, updateTicket);
router.delete("/:id", requiresAuth(), deleteTicket);

export default router;
