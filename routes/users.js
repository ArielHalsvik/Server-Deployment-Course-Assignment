var express = require("express");
var router = express.Router();
var fs = require("fs");
var path = require("path");
var jwt = require("jsonwebtoken");
var jsend = require("jsend");
router.use(jsend.middleware);

/* Login for users */
router.post("/login", (req, res) => {
  const { login, password } = req.body;

  if (login == null) {
    return res.jsend.fail({ message: "Login is required." });
  }

  if (password == null) {
    return res.jsend.fail({ message: "Password is required." });
  }

  const users = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, "../data/user.json"))
  );
  let filteredUsers = users.filter((user) => user.login === login);
  if (filteredUsers.length > 0) {
    let user = filteredUsers[0];
    if (user.password === password) {
      let token;
      try {
        token = jwt.sign({ login: user.login }, process.env.TOKEN_SECRET, {
          expiresIn: "1h",
        });
      } catch (error) {
        return res.jsend.error({ message: error.message });
      }

      return res.jsend.success({ message: "Login successful.", token: token });
    } else {
      return res.jsend.fail({ message: "Invalid password." });
    }
  } else {
    return res.jsend.fail({ message: "Invalid login." });
  }
});

module.exports = router;