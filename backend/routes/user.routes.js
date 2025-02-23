const express = require("express");
const controller = require("../controller/user.controller.js");
const router = express.Router();

router.post("/signup", controller.register);
router.post("/login", controller.login);
router.get("/logout", controller.logout);

module.exports = router;
