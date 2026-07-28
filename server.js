import "dotenv/config";
import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { createRequire } from "module";
import { initDb } from "./database/connection.js";
import routes from "./routes/index.js";
import { errorHandler } from "./middleware/errorHandler.js";

const require = createRequire(import.meta.url);
const swaggerDocument = require("./swagger-output.json");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app
  .use(cors())
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  .use("/", routes)
  .use(errorHandler);

initDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to start server due to database connection error:", err);
  });
