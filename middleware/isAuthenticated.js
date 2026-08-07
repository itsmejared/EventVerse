export default function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  const error = new Error("Unauthorized: User is not authenticated");
  error.statusCode = 401;
  next(error);
}
