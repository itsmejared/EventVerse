// routes/tickets.js
import express from "express";
import {
  getAllTickets,
  getTicketById,
  createTicket,
  updateTicket,
  deleteTicket,
} from "../controllers/tickets.js";
import { validateTicket } from "../middleware/validate.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

router.get("/", getAllTickets);
router.get("/:id", getTicketById);
router.post("/", isAuthenticated, validateTicket, createTicket);
router.put("/:id", isAuthenticated, validateTicket, updateTicket);
router.delete("/:id", isAuthenticated, deleteTicket);

export default router;
