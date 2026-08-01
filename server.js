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
const customOptions = {
  customSiteTitle: "Eventverse API - Documentation",
};

// Middleware
app
  .use(cors())
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument, customOptions))
  .use("/", routes)
  .use(errorHandler);

initDb()
  .then(() => {
    app.listen(PORT, () => {
      const load_route = process.env.RENDER_EXTERNAL_HOSTNAME || "http://localhost";
      console.log(`Server running on ${load_route}:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to start server due to database connection error:", err);
  });
