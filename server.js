import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import morgan from "morgan";
import path from "path";
import connectDB from "./config/db.js";
import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";

// Middleware
import logger from "./middleware/logger.js";
import errorHandler from "./middleware/error.js";
// Route files
import bootcamps from "./routes/bootcamps.js";
import courses from "./routes/courses.js";
import auth from "./routes/auth.js";
import users from "./routes/users.js";

import { fileURLToPath } from "url";

// Get current file path and directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env vars
dotenv.config({ path: "./config/config.env" });

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// File uploading
app.use(fileUpload());
// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// Mount routers
app.use("/api/v1/bootcamps", bootcamps);
app.use("/api/v1/courses", courses);
app.use("/api/v1/auth", auth);
app.use("/api/v1/users", users);
// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Logger Middleware
// app.use(logger);

// Error handler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server is running in { ${process.env.NODE_ENV} } mode on port ${PORT}`
      .white.bold.bgGreen
  );
});
