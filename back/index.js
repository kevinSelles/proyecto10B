require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectDB } = require("./src/config/db");
const activitiesRouter = require("./src/api/routes/activities");
const usersRouter = require("./src/api/routes/users");
const galleryRouter = require("./src/api/routes/gallery");
const contactRouter = require("./src/api/routes/contact");

require("./src/config/cloudinary");

const app = express();

const port = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());

connectDB();

app.get("api/v1/activities", activitiesRouter);
app.use("api/v1/users", usersRouter);
app.use("api/v1/gallery", galleryRouter);
app.use("api/v1/contact", contactRouter);

app.use((req, res, next) => {
  return res.status(404).json("Ruta no encontrada");
});

app.listen(port, () => {
  console.log("Escuchando en http://localhost:3000");
});