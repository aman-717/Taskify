const express = require("express");
const controller = require("../controller/todo.controller.js");
const authenticate = require("../middleware/authorized.js");
const router = express.Router();
router.post("/create", authenticate, controller.createTodo);
router.get("/fetch", authenticate, controller.getTodos);
router.put("/update/:id", authenticate, controller.updateTodo);
router.delete("/delete/:id", authenticate, controller.deleteTodo);
module.exports = router;
