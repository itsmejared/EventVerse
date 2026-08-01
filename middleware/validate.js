// middleware/validate.js
import { ObjectId } from "mongodb";

//Events Collection
export const validateEvent = (req, res, next) => {
  const {
    title,
    description,
    category,
    date,
    ticketPrice,
    totalCapacity,
    organizerEmail,
    isPublished,
  } = req.body;

  if (
    !title ||
    !description ||
    !category ||
    !date ||
    ticketPrice === undefined ||
    !totalCapacity ||
    !organizerEmail ||
    isPublished === undefined
  ) {
    return res.status(400).json({ message: "All 8 required fields must be provided." });
  }

  if (typeof ticketPrice !== "number" || ticketPrice < 0) {
    return res.status(400).json({ message: "ticketPrice must be a number >= 0." });
  }

  if (typeof totalCapacity !== "number" || totalCapacity <= 0) {
    return res.status(400).json({ message: "totalCapacity must be a number > 0." });
  }

  if (typeof isPublished !== "boolean") {
    return res.status(400).json({ message: "isPublished must be a boolean." });
  }

  next();
};

export const validateId = (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid MongoDB ObjectId format." });
  }
  next();
};

//Venues Collection
export const validateVenue = (req, res, next) => {
  const { name, address, city, capacity, contactPhone } = req.body;

  if (!name || !address || !city || !capacity || !contactPhone) {
    return res.status(400).json({
      message: "All fields are required: name, address, city, capacity, contactPhone",
    });
  }

  if (typeof capacity !== "number" || capacity <= 0) {
    return res.status(400).json({ message: "Capacity must be a positive number" });
  }

  next();
};
