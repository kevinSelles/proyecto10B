require("dotenv").config();
const express = require("express");
const serverless = require("serverless-http");

const { connectDB } = require("../src/config/db");
const activitiesRouter = require("../src/api/routes/activities");
const usersRouter = require("../src/api/routes/users");
const galleryRouter = require("../src/api/routes/gallery");
const contactRouter = require("../src/api/routes/contact");
require("../src/config/cloudinary");

const app = express();

const FRONT_URL = process.env.FRONT_URL || "http://localhost:5173";
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (!origin || origin === FRONT_URL) {
    res.setHeader("Access-Control-Allow-Origin", origin || FRONT_URL);
  } else {
    res.setHeader("Access-Control-Allow-Origin", FRONT_URL);
  }
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  if (req.method === "OPTIONS") return res.status(204).end();
  next();
});

app.use(express.json());
connectDB();

app.use("/api/v1/activities", activitiesRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/gallery", galleryRouter);
app.use("/api/v1/contact", contactRouter);

app.use((req, res) => res.status(404).json("Ruta no encontrada"));

module.exports = app;
module.exports.handler = serverless(app);