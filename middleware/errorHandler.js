export const errorHandler = (err, req, res, _next) => {
  if (err.name === "UnauthorizedError" || err.status === 401) {
    console.log(`Blocked unauthenticated access to: ${req.originalUrl}`);
    return res.status(401).json({
      error: "Unauthorized",
      message: "Authentication is required to access this resource.",
    });
  }

  console.error("Unhandled Application Error:", err);
  res.status(err.status || 500).json({
    error: err.name || "InternalServerError",
    message: err.message || "An unexpected error occurred.",
  });
};
