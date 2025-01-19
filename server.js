import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import morgan from "morgan";
import connectDB from "./config/db.js";
// Middleware
import logger from "./middleware/logger.js";
import errorHandler from "./middleware/error.js";
// Route files
import bootcamps from "./routes/bootcamps.js";
// Load env vars
dotenv.config({ path: "./config/config.env" });

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Mount routers
app.use("/api/v1/bootcamps", bootcamps);

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
