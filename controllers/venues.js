// controllers/venues.js
import { ObjectId } from "mongodb";
import { getDb } from "../database/connection.js";

// GET /venues - Fetch all venues
export const getAllVenues = async (req, res, next) => {
  // #swagger.tags = ['Venues']
  try {
    const db = getDb();
    const venues = await db.collection("venues").find().toArray();
    res.status(200).json(venues);
  } catch (error) {
    next(error);
  }
};

// GET /venues/:id - Fetch a single venue by ID
export const getVenueById = async (req, res, next) => {
  // #swagger.tags = ['Venues']
  try {
    const db = getDb();
    const venue = await db.collection("venues").findOne({ _id: new ObjectId(req.params.id) });

    if (!venue) {
      return res.status(404).json({ message: "Venue not found" });
    }

    res.status(200).json(venue);
  } catch (error) {
    next(error);
  }
};

// POST /venues - Create a new venue
export const createVenue = async (req, res, next) => {
  // #swagger.tags = ['Venues']
  try {
    const { name, address, city, capacity, contactPhone } = req.body;
    const newVenue = { name, address, city, capacity, contactPhone };

    const db = getDb();
    const result = await db.collection("venues").insertOne(newVenue);

    res.status(201).json({ _id: result.insertedId, ...newVenue });
  } catch (error) {
    next(error);
  }
};

// PUT /venues/:id - Update an existing venue
export const updateVenue = async (req, res, next) => {
  // #swagger.tags = ['Venues']
  try {
    const { name, address, city, capacity, contactPhone } = req.body;

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
};

// DELETE /venues/:id - Delete a venue
export const deleteVenue = async (req, res, next) => {
  // #swagger.tags = ['Venues']
  try {
    const db = getDb();
    const result = await db.collection("venues").deleteOne({ _id: new ObjectId(req.params.id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Venue not found" });
    }

    res.status(200).json({ message: "Venue deleted successfully" });
  } catch (error) {
    next(error);
  }
};
