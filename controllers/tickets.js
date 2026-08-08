// controllers/tickets.js
import { ObjectId } from "mongodb";
import { getDb } from "../database/connection.js";

// GET /tickets - Fetch all tickets
export const getAllTickets = async (req, res, next) => {
  // #swagger.tags = ['Tickets']
  try {
    const db = getDb();
    const tickets = await db.collection("tickets").find().toArray();
    res.status(200).json(tickets);
  } catch (error) {
    next(error);
  }
};

// GET /tickets/:id - Fetch a single ticket by ID
export const getTicketById = async (req, res, next) => {
  // #swagger.tags = ['Tickets']
  try {
    const db = getDb();
    const ticket = await db.collection("tickets").findOne({ _id: new ObjectId(req.params.id) });

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    res.status(200).json(ticket);
  } catch (error) {
    next(error);
  }
};

// POST /tickets - Create a new ticket
export const createTicket = async (req, res, next) => {
  // #swagger.tags = ['Tickets']
  try {
    const { eventId, userEmail, purchaseDate, seatNumber, pricePaid, status } = req.body;
    const newTicket = {
      eventId: new ObjectId(eventId),
      userEmail,
      purchaseDate,
      seatNumber,
      pricePaid,
      status,
    };

    const db = getDb();
    const result = await db.collection("tickets").insertOne(newTicket);

    res.status(201).json({ _id: result.insertedId, ...newTicket });
  } catch (error) {
    next(error);
  }
};

// PUT /tickets/:id - Update an existing ticket
export const updateTicket = async (req, res, next) => {
  // #swagger.tags = ['Tickets']
  try {
    const { eventId, userEmail, purchaseDate, seatNumber, pricePaid, status } = req.body;

    const db = getDb();
    const result = await db.collection("tickets").updateOne(
      { _id: new ObjectId(req.params.id) },
      {
        $set: {
          eventId: new ObjectId(eventId),
          userEmail,
          purchaseDate,
          seatNumber,
          pricePaid,
          status,
        },
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    res.status(200).json({ message: "Ticket updated successfully" });
  } catch (error) {
    next(error);
  }
};

// DELETE /tickets/:id - Delete a ticket
export const deleteTicket = async (req, res, next) => {
  // #swagger.tags = ['Tickets']
  try {
    const db = getDb();
    const result = await db.collection("tickets").deleteOne({ _id: new ObjectId(req.params.id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    res.status(200).json({ message: "Ticket deleted successfully" });
  } catch (error) {
    next(error);
  }
};
