require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectDB } = require("./src/config/db");
const activitiesRouter = require("./src/api/routes/activities");
const usersRouter = require("./src/api/routes/users");
require("./src/config/cloudinary");

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());

connectDB();

app.use("/api/v1/activities", activitiesRouter);
app.use("/api/v1/users", usersRouter);

app.use((req, res, next) => {
  return res.status(404).json("Ruta no encontrada");
})

app.listen(3000, () => {
  console.log("Servidor iniciado en http://localhost:3000");
})