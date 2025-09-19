const { adminAuth, auth } = require("../../middlewares/auth");
const { getUsers, postUser, login, deleteUser, putUser, getUserActivities } = require("../controllers/users");
const usersRouter = require("express").Router();

usersRouter.get("/", [adminAuth], getUsers);
usersRouter.post("/register", postUser);
usersRouter.post("/login", login);
usersRouter.put("/:id", [auth], putUser);
usersRouter.delete("/:id", [auth], deleteUser);
usersRouter.get("/:id/activities", [auth], getUserActivities);

module.exports = usersRouter;