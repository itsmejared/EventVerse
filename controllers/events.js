// controllers/events.js
import { ObjectId } from "mongodb";
import { getDb } from "../database/connection.js";

// GET /events - Retrieve all events
export const getAllEvents = async (req, res, next) => {
  // #swagger.tags = ['Events']
  try {
    const db = getDb();
    const events = await db.collection("events").find().toArray();
    res.status(200).json(events);
  } catch (error) {
    next(error);
  }
};

// GET /events/:id - Retrieve a single event by ID
export const getEventById = async (req, res, next) => {
  // #swagger.tags = ['Events']
  try {
    const db = getDb();
    const event = await db.collection("events").findOne({ _id: new ObjectId(req.params.id) });

    if (!event) {
      return res.status(404).json({ message: "Event not found." });
    }

    res.status(200).json(event);
  } catch (error) {
    next(error);
  }
};

// POST /events - Create a new event
export const createEvent = async (req, res, next) => {
  // #swagger.tags = ['Events']
  try {
    const db = getDb();
    const newEvent = {
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      date: req.body.date,
      ticketPrice: req.body.ticketPrice,
      totalCapacity: req.body.totalCapacity,
      organizerEmail: req.body.organizerEmail,
      isPublished: req.body.isPublished,
    };

    const result = await db.collection("events").insertOne(newEvent);
    res.status(201).json({ _id: result.insertedId, ...newEvent });
  } catch (error) {
    next(error);
  }
};

// PUT /events/:id - Update an event
export const updateEvent = async (req, res, next) => {
  // #swagger.tags = ['Events']
  try {
    const db = getDb();
    const updatedData = {
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      date: req.body.date,
      ticketPrice: req.body.ticketPrice,
      totalCapacity: req.body.totalCapacity,
      organizerEmail: req.body.organizerEmail,
      isPublished: req.body.isPublished,
    };

    const result = await db
      .collection("events")
      .replaceOne({ _id: new ObjectId(req.params.id) }, updatedData);

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Event not found." });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

// DELETE /events/:id - Delete an event
export const deleteEvent = async (req, res, next) => {
  // #swagger.tags = ['Events']
  try {
    const db = getDb();
    const result = await db.collection("events").deleteOne({ _id: new ObjectId(req.params.id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Event not found." });
    }

    res.status(200).json({ message: "Event successfully deleted." });
  } catch (error) {
    next(error);
  }
};
