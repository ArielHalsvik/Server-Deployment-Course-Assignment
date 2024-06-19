const jwt = require("jsonwebtoken");

function adminAccess(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.jsend.fail({ message: "Token must be provided." });
  }

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    if (verified.login === "admin") {
      next();
    } else {
      res.jsend.fail({ message: "Access denied." });
    }
  } catch (error) {
    res.jsend.fail({ message: "Invalid token." });
  }
}

module.exports = adminAccess;