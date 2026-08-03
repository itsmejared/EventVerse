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

const router = express.Router();

router.get("/", getAllTickets);
router.get("/:id", getTicketById);
router.post("/", validateTicket, createTicket);
router.put("/:id", validateTicket, updateTicket);
router.delete("/:id", deleteTicket);

export default router;