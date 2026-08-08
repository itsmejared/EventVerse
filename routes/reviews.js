import express from "express";
import {
  getAllReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
} from "../controllers/reviews.js";
import { validateReview, validateId } from "../middleware/validate.js";
import pkg from "express-openid-connect";

const { requiresAuth } = pkg;
const router = express.Router();

// PUBLIC ROUTES (No login required)
router.get("/", getAllReviews);
router.get("/:id", validateId, getReviewById);

// PROTECTED ROUTES (Requires active Auth0 session)
router.post("/", requiresAuth(), validateReview, createReview);
router.put("/:id", requiresAuth(), validateId, validateReview, updateReview);
router.delete("/:id", requiresAuth(), validateId, deleteReview);

export default router;
