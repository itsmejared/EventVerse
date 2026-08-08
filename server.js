import "dotenv/config";
import express from "express";
import cors from "cors";
import authPkg from "express-openid-connect";
const { auth } = authPkg;
import swaggerUi from "swagger-ui-express";
import { createRequire } from "module";
import { initDb } from "./database/connection.js";
import routes from "./routes/index.js";
import { errorHandler } from "./middleware/errorHandler.js";

const require = createRequire(import.meta.url);
const swaggerDocument = require("./swagger-output.json");

const app = express();
const PORT = process.env.PORT || 3000;

// Auth0 Configuration
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL || `http://localhost:${PORT}`,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
};

// Middleware
app
  .use(cors())
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(express.static("public"))
  .use(auth(config))
  .use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, {
      customJs: "/swagger-auth-status.js",
    })
  )
  .use("/", routes)
  .use(errorHandler);

if (process.env.NODE_ENV !== "test") {
  initDb()
    .then(() => {
      app.listen(PORT, () => {
        const load_route = process.env.RENDER_EXTERNAL_HOSTNAME
          ? `https://${process.env.RENDER_EXTERNAL_HOSTNAME}`
          : `http://localhost:${PORT}`;
        console.log(`Server running on ${load_route}`);
      });
    })
    .catch((err) => {
      console.error("Failed to start server due to database connection error:", err);
    });
}

export default app;
