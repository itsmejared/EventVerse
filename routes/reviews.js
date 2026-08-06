import express from "express";
import {
  getAllReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
} from "../controllers/reviews.js";
import { validateReview, validateId } from "../middleware/validate.js";

const router = express.Router();

router.get("/", getAllReviews);
router.get("/:id", validateId, getReviewById);
router.post("/", validateReview, createReview);
router.put("/:id", validateId, validateReview, updateReview);
router.delete("/:id", validateId, deleteReview);

export default router;
