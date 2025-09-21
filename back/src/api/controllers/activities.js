const { deleteFile } = require("../../utils/deleteFile");
const Activity = require("../models/activities");

const getActivities = async (req, res, next) => {
  try {
    const activities = await Activity.find()
    .populate("users", "_id");
    return res.status(200).json(activities);
  } catch (error) {
    return res.status(400).json("Error al mostrar las actividades, inténtelo de nuevo.");
  }
};

const getActivityById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const activity = await Activity.findById(id)
    .populate("users");
    return res.status(200).json(activity);
  } catch (error) {
    return res.status(400).json("Error al buscar la actividad, inténtelo de nuevo.");
  }
};

const getActivitiesByTitle = async (req, res, next) => {
  try {
    const { title } = req.params;
    const activities = await Activity.find({ title: { $regex: title, $options: "i" } })
    .populate("users");

     if (!activities.length) {
      return res.status(404).json("No encuentro actividades con ese nombre, pruebe con una palabra más genérica.");
    }

    return res.status(200).json(activities);
  } catch (error) {
    return res.status(400).json("Error de búsqueda, inténtelo de nuevo.");
  }
};

const postActivity = async (req, res, next) => {
  try {
    const newActivity = new Activity(req.body);

    if (req.file) {
      newActivity.img = req.file.path;
    };

    const activitySaved = await newActivity.save();

    return res.status(201).json(activitySaved);
  } catch (error) {
      if (req.file) {
      deleteFile(req.file.path);
    }
    return res.status(400).json("Error al publicar la nueva actividad, inténtelo de nuevo.");
  }
};

const putActivity = async (req, res, next) => {
  try {
    const { id } = req.params;
    const oldActivity = await Activity.findById(id);

    const updates = { ...req.body };

    if (req.file) {
      if(oldActivity.img) {
        deleteFile(oldActivity.img);
      }
      updates.img = req.file.path;
    };

    if (!updates.users) {
      updates.users = oldActivity.users;
    }

    const activityUpdated = await Activity.findByIdAndUpdate(id, updates, { new: true });
    return res.status(200).json(activityUpdated);
  } catch (error) {
      if (req.file) {
      deleteFile(req.file.path);
    }
    return res.status(400).json("Error actualizando la actividad, inténtelo de nuevo.");
  }
};

const deleteActivity = async (req, res, next) => {
  try {
    const { id } = req.params;
    const activityDeleted = await Activity.findByIdAndDelete(id);

    if (activityDeleted.img) {
      deleteFile(activityDeleted.img);
    };

    return res.status(200).json(activityDeleted);
  } catch (error) {
    return res.status(400).json("Error eliminando la actividad, inténtelo de nuevo.");
  }
};

const joinActivity = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const activity = await Activity.findById(id);

    if (activity.users.includes(userId)) {
      return res.status(400).json("Ya estás apuntado a esta actividad");
    }

    activity.users.push(userId);
    const updatedActivity = await activity.save();

    return res.status(200).json(updatedActivity);
  } catch (error) {
    return res.status(400).json("Error al apuntarse a la actividad");
  }
};

const leaveActivity = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const activity = await Activity.findById(id);

    activity.users = activity.users.filter(u => u.toString() !== userId.toString());
    const updatedActivity = await activity.save();

    return res.status(200).json(updatedActivity);
  } catch (error) {
    return res.status(400).json("Error al desapuntarse de la actividad");
  }
};

module.exports = {
  getActivities,
  getActivityById,
  getActivitiesByTitle,
  postActivity,
  putActivity,
  deleteActivity,
  joinActivity,
  leaveActivity
};