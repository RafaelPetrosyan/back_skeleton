const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRET = process.env.SECRET;
const sqlite3 = require("sqlite3").verbose();
let db = new sqlite3.Database("data.db");

function authenticateToken(req, res, next) {
  const token = req.headers.authorization;
  if (token == null) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  jwt.verify(token, SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Token is invalid or expired" });
    }
    const { role } = user;
    if (role !== "admin") {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  });
}

function checkRole(req, res) {
  const token = req.headers.authorization;
  const decoded = jwt.decode(token);
  const role = decoded.role;
  return role;
}

function generateAccessToken(userid) {
  return jwt.sign(userid, SECRET, { expiresIn: "36000s" });
}

module.exports = {
  generateAccessToken,
  checkRole,
  authenticateToken,
};
