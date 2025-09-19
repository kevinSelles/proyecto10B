const { adminAuth, auth } = require("../../middlewares/auth");
const upload = require("../../middlewares/file");
const { getActivities, getActivityById, getActivitiesByTitle, postActivity, putActivity, deleteActivity, joinActivity, leaveActivity } = require("../controllers/activities");

const activitiesRouter = require("express").Router();

activitiesRouter.get("/title/:title", getActivitiesByTitle);
activitiesRouter.get("/:id", getActivityById);
activitiesRouter.get("/", getActivities);
activitiesRouter.post("/", [adminAuth], upload.single("img"), postActivity);
activitiesRouter.put("/:id", [adminAuth], upload.single("img"), putActivity);
activitiesRouter.delete("/:id", [adminAuth], deleteActivity);
activitiesRouter.post("/:id/join", [auth], joinActivity);
activitiesRouter.post("/:id/leave", [auth], leaveActivity);

module.exports = activitiesRouter;