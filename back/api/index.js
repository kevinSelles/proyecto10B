require("dotenv").config();
const express = require("express");
const cors = require("cors");
const serverless = require("serverless-http");
const { connectDB } = require("../src/config/db");
const activitiesRouter = require("../src/api/routes/activities");
const usersRouter = require("../src/api/routes/users");
const galleryRouter = require("../src/api/routes/gallery");
const contactRouter = require("../src/api/routes/contact");

require("../src/config/cloudinary");

const app = express();

const FRONT_URL = "https://splish-splash-cadiz.vercel.app" || "http://localhost:5173";

app.use(cors({
  origin: FRONT_URL,
  credentials: true
}));

app.use(express.json());

connectDB();

app.use("/api/v1/activities", activitiesRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/gallery", galleryRouter);
app.use("/api/v1/contact", contactRouter);

app.use((req, res, next) => {
  return res.status(404).json("Ruta no encontrada");
});

module.exports.handler = serverless(app);