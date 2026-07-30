import express from "express";
import { ObjectId } from "mongodb";
import { getDb } from "../database/connection.js";

const router = express.Router();

// GET /venues - Fetch all venues
router.get("/", async (req, res, next) => {
  try {
    const db = getDb();
    const venues = await db.collection("venues").find().toArray();
    res.status(200).json(venues);
  } catch (error) {
    next(error);
  }
});

// GET /venues/:id - Fetch a single venue by ID
router.get("/:id", async (req, res, next) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid venue ID format" });
    }

    const db = getDb();
    const venue = await db.collection("venues").findOne({ _id: new ObjectId(req.params.id) });

    if (!venue) {
      return res.status(404).json({ message: "Venue not found" });
    }

    res.status(200).json(venue);
  } catch (error) {
    next(error);
  }
});

// POST /venues - Create a new venue
router.post("/", async (req, res, next) => {
  try {
    const { name, address, city, capacity, contactPhone } = req.body;

    if (!name || !address || !city || !capacity || !contactPhone) {
      return res.status(400).json({
        message: "All fields are required: name, address, city, capacity, contactPhone",
      });
    }

    if (typeof capacity !== "number" || capacity <= 0) {
      return res.status(400).json({ message: "Capacity must be a positive number" });
    }

    const newVenue = { name, address, city, capacity, contactPhone };

    const db = getDb();
    const result = await db.collection("venues").insertOne(newVenue);

    res.status(201).json({ _id: result.insertedId, ...newVenue });
  } catch (error) {
    next(error);
  }
});
// PUT /venues/:id - Update an existing venue
router.put("/:id", async (req, res, next) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid venue ID format" });
    }

    const { name, address, city, capacity, contactPhone } = req.body;

    if (!name || !address || !city || !capacity || !contactPhone) {
      return res.status(400).json({
        message: "All fields are required: name, address, city, capacity, contactPhone",
      });
    }

    const db = getDb();
    const result = await db
      .collection("venues")
      .updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: { name, address, city, capacity, contactPhone } }
      );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Venue not found" });
    }

    res.status(200).json({ message: "Venue updated successfully" });
  } catch (error) {
    next(error);
  }
});

// DELETE /venues/:id - Delete a venue
router.delete("/:id", async (req, res, next) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid venue ID format" });
    }

    const db = getDb();
    const result = await db.collection("venues").deleteOne({ _id: new ObjectId(req.params.id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Venue not found" });
    }

    res.status(200).json({ message: "Venue deleted successfully" });
  } catch (error) {
    next(error);
  }
});
export default router;
