const express = require("express");
const dotenv = require("dotenv");

// Load env vars
dotenv.config({ path: "./config/config.env" });

const app = express();

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello " + process.env.NODE_ENV + " mode");
});

app.listen(PORT, () => {
  console.log(
    "Server is running in {" + process.env.NODE_ENV + "} mode on port " + PORT
  );
});
