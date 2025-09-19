const jwt = require("jsonwebtoken");

const generateKey = (id) => {
    return jwt.sign({ id }, process.env.JWT_KEY, { expiresIn: "1w" });
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_KEY);
};


module.exports = {generateKey, verifyToken};