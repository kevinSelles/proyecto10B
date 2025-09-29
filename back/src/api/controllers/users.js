const { generateKey } = require("../../config/jwt");
const User = require("../models/users");
const Activity = require("../models/activities");
const bcrypt = require("bcrypt");

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(400).json(error);
  }
}

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json("Usuario no encontrado");

    res.json({
      _id: user._id,
      rol: user.rol,
      userName: user.userName,
      email: user.email
    });
  } catch (error) {
    res.status(500).json({message: "Error al obtener usuario", error: error.message});
  }
};

const postUser = async (req, res, next) => {
  try {
    const newUser = new User(req.body);
    newUser.rol = "user";

    const duplicateUser = await User.findOne({userName: newUser.userName});
    if(duplicateUser !== null) {
      return res.status(400).json("Este nombre de usuario ya está en uso, por favor elige otro nombre.");
    };

    const duplicateEmail = await User.findOne({email: newUser.email});
    if(duplicateEmail !== null) {
      return res.status(400).json("Este email ya está registrado, prueba con otro.");
    };

    const userSaved = await newUser.save();

    const token = generateKey(userSaved._id);

    return res.status(201).json({ user: userSaved, token });
  } catch (error) {
    return res.status(400).json({message: "Error en el registro, por favor, inténtelo de nuevo. Si el problema persiste, contacte con un administrador.", error: error.message});
  }
}

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({userName: req.body.userName})

    if(user === null) {
      return res.status(400).json("Este usuario no existe.");
    }
    if(bcrypt.compareSync(req.body.password, user.password)) {
      const token = generateKey(user._id);
      return res.status(200).json({ user, token });
    } else {
      return res.status(400).json("Contraseña incorrecta.");
    };
  } catch (error) {
    return res.status(400).json({message: "Error de carga en el login. Inténtelo de nuevo, si el problema persiste, contacte con un administrador.", error: error.message});
  
  };
};

const putUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    if(req.user._id.toString() !== id && req.user.rol !== "admin") {
      return res.status(400).json("Error, solo puedes modificar los datos de tu propio perfil.");
    }

    if (req.user.rol !== "admin" && req.body.rol) {
      delete req.body.rol;
      return res.status(400).json("Error, solo los administradores pueden cambiar los roles de los usuarios.");
    }

    const newUser = new User(req.body);
    newUser._id = id;
    const userUpdated = await User.findByIdAndUpdate(id, { $set: req.body }, {new: true,});
    return res.status(200).json(userUpdated);
  } catch (error) {
    return res.status(400).json({message: "Error al actualizar los datos, inténtelo de nuevo, si el problema persiste, contacte con un administrador.", error: error.message});
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    if(req.user._id.toString() !== id && req.user.rol !== "admin") {
    return res.status(403).json("Solo estas autorizado a borrar tu propio perfil.");
    }

    const userDeleted = await User.findByIdAndDelete(id);
    return res.status(200).json(userDeleted);
  } catch (error) {
    return res.status(400).json({message: "Error al eliminar usuario. Inténtelo de nuevo, si el problema persiste, contacte con un administrador.", error: error.message});
  }
}

const getUserActivities = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (req.user.rol !== "admin" && req.user._id.toString() !== id) {
      return res.status(403).json("No tienes permisos para ver actividades de otros usuarios.");
    }

    const activities = await Activity.find({ users: id })
      .populate("users", "username email");

    if (!activities.length) {
      return res.status(404).json("Este usuario no está inscrito en ninguna actividad.");
    }

    return res.status(200).json(activities);
  } catch (error) {
    return res.status(400).json({message: "Error al obtener actividades del usuario.", error: error.message});
  }
};

module.exports = { getUsers, getUserById, postUser, login, deleteUser, putUser, getUserActivities };