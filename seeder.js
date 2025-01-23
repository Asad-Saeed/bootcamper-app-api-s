import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";

// Load env vars
dotenv.config({ path: "./config/config.env" });

// Get __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import Bootcamp from "./models/Bootcamp.js";

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Read JSON file
const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`, "utf-8")
);

// Import data into DB
const importData = async () => {
  try {
    await Bootcamp.create(bootcamps);
    console.log("Data Imported...".green.inverse);
    process.exit(0);
  } catch (err) {
    console.log(err);
  }
};

// Delete data from DB
const deleteData = async () => {
  try {
    await Bootcamp.deleteMany();
    console.log("Data Deleted...".red.inverse);
    process.exit(0);
  } catch (err) {
    console.log(err);
  }
};

// Run seeder
if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
