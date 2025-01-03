const express = require("express");
const dotenv = require("dotenv");

// Load env vars
dotenv.config({ path: "./config/config.env" });

const app = express();

const PORT = process.env.PORT || 5000;

app.get("/api/v1/bootcamps", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Show all bootcamps",
    data: { name: "Asad Saeed" },
  });
});

app.get("/api/v1/bootcamps/:id", (req, res) => {
  res.status(200).json({
    success: true,
    message: `Show bootcamp ${req.params.id}`,
  });
});

app.post("/api/v1/bootcamps", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Create new bootcamps",
  });
});

app.put("/api/v1/bootcamps/:id", (req, res) => {
  res.status(200).json({
    success: true,
    message: `Update bootcamp ${req.params.id}`,
  });
});

app.delete("/api/v1/bootcamps/:id", (req, res) => {
  res.status(200).json({
    success: true,
    message: `Delete bootcamps ${req.params.id}`,
  });
});

app.listen(PORT, () => {
  console.log(
    "Server is running in {" + process.env.NODE_ENV + "} mode on port " + PORT
  );
});
