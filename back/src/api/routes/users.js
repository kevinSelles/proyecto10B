const { adminAuth, auth } = require("../../middlewares/auth");
const { getUsers, postUser, login, deleteUser, putUser, getUserActivities, getUserById } = require("../controllers/users");
const usersRouter = require("express").Router();

usersRouter.get("/", [adminAuth], getUsers);
usersRouter.get("/:id", [auth], getUserById);
usersRouter.post("/register", postUser);
usersRouter.post("/login", login);
usersRouter.put("/:id", [auth], putUser);
usersRouter.delete("/:id", [auth], deleteUser);
usersRouter.get("/:id/activities", [auth], getUserActivities);

module.exports = usersRouter;