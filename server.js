import "dotenv/config";
import express from "express";
import session from "express-session";
import passport from "./passport.js";
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
  customJs: "/swagger-auth-status.js",
  customCss: `
    .auth-status-banner {
      position: sticky;
      top: 0;
      z-index: 1000;
      padding: 10px 16px;
      font-family: sans-serif;
      font-size: 14px;
      border-bottom: 1px solid #d0d7de;
      background: #f6f8fa;
      color: #24292f;
    }
    .auth-status-banner a {
      color: inherit;
      font-weight: 600;
      text-decoration: underline;
    }
    .auth-status-logged-in {
      background: #dafbe1;
      border-bottom-color: #4ac26b;
    }
    .auth-status-logged-out {
      background: #fff8c5;
      border-bottom-color: #d4a72c;
    }
    .auth-status-error {
      background: #ffebe9;
      border-bottom-color: #ff8182;
    }
  `,
};
app.set("trust proxy", 1); // Trust first proxy for secure cookies

// Middleware
app
  .use(cors())
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(express.static("public"))
  .use(
    session({
      secret: process.env.SESSION_SECRET || "default_secret",
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: process.env.NODE_ENV === "production", // Use secure cookies in production
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      },
    })
  )
  .use(passport.initialize())
  .use(passport.session())
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
