export const errorHandler = (err, req, res, _next) => {
  console.error("Unhandled Application Error:", err);

  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    error: err.name || "InternalServerError",
    message: err.message || "An unexpected error occurred on the server.",
  });
};
