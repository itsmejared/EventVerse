import { ObjectId } from "mongodb";
import { getDb } from "../database/connection.js";

// GET /reviews - Retrieve all reviews
export const getAllReviews = async (req, res, next) => {
  // #swagger.tags = ['Reviews']
  try {
    const db = getDb();
    const reviews = await db.collection("reviews").find().toArray();
    res.status(200).json(reviews);
  } catch (error) {
    next(error);
  }
};

// GET /reviews/:id - Retrieve a single review by ID
export const getReviewById = async (req, res, next) => {
  // #swagger.tags = ['Reviews']
  try {
    const db = getDb();
    const review = await db.collection("reviews").findOne({ _id: new ObjectId(req.params.id) });

    if (!review) {
      return res.status(404).json({ message: "Review not found." });
    }

    res.status(200).json(review);
  } catch (error) {
    next(error);
  }
};

// POST /reviews - Create a new review
export const createReview = async (req, res, next) => {
  // #swagger.tags = ['Reviews']
  try {
    const { eventId, userEmail, rating, comment, createdAt } = req.body;
    const newReview = {
      eventId: new ObjectId(eventId),
      userEmail,
      rating: Number(rating),
      comment,
      createdAt: createdAt || new Date().toISOString(),
    };

    const db = getDb();
    const result = await db.collection("reviews").insertOne(newReview);
    res.status(201).json({ _id: result.insertedId, ...newReview });
  } catch (error) {
    next(error);
  }
};

// PUT /reviews/:id - Update a review
export const updateReview = async (req, res, next) => {
  // #swagger.tags = ['Reviews']
  try {
    const { eventId, userEmail, rating, comment, createdAt } = req.body;
    const updatedData = {
      eventId: new ObjectId(eventId),
      userEmail,
      rating: Number(rating),
      comment,
      createdAt: createdAt || new Date().toISOString(),
    };

    const db = getDb();
    const result = await db
      .collection("reviews")
      .replaceOne({ _id: new ObjectId(req.params.id) }, updatedData);

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Review not found." });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

// DELETE /reviews/:id - Delete a review
export const deleteReview = async (req, res, next) => {
  // #swagger.tags = ['Reviews']
  try {
    const db = getDb();
    const result = await db.collection("reviews").deleteOne({ _id: new ObjectId(req.params.id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Review not found." });
    }

    res.status(200).json({ message: "Review successfully deleted." });
  } catch (error) {
    next(error);
  }
};
