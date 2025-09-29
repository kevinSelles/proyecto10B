const User = require("../api/models/users");
const { verifyToken } = require("../config/jwt");

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const parsedToken = token.replace("Bearer ", "");
    
    const { id } = verifyToken(parsedToken);
    const user = await User.findById(id);
    user.password = null;
    req.user = user;
    
    next()
  } catch (error) {
    return res.status(400).json({message: "No tienes permiso, logueate primero. Si el problema persiste, contacta con un administrador.", error: error.message});
  }
}

const adminAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const parsedToken = token.replace("Bearer ", "");
    
    const { id } = verifyToken(parsedToken);
    const user = await User.findById(id);

    if (user.rol === "admin") {
      user.password = null;
      req.user = user;
      next()
    } else {
      return res.status(400).json("Necesitas permiso de administrador para continuar en esta sección.");
    }
    
  } catch (error) {
    return res.status(400).json({message: "No tienes permiso, logueate primero. Si el problema persiste, contacta con un administrador.", error: error.message});
  }
}

module.exports = { auth, adminAuth };