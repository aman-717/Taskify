const Todo = require("../model/todo.model");
const createTodo = async (req, res) => {
  const todo = new Todo({
    text: req.body.text,
    completed: req.body.completed,
    user: req.user._id, //associate todo with loggedin user
  });

  try {
    const newTodo = await todo.save();
    res.status(200).json({
      success: true,
      message: "Todo created successfully",
      newTodo,
    });
  } catch (error) {
    console.log(error);
    res.satus(400).json({
      success: false,
      message: "Error occuring in Todo creation",
    });
  }
};
const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user._id }); //fetch todo only for logged in user
    res.status(200).json({
      success: true,
      message: "Fetched successfully",
      todos,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Error occuring in Todo getting",
    });
  }
};
const updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({
      success: true,
      message: "update successfully",
      todo,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Error occuring in Todo updating",
    });
  }
};
const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Error occuring in Todo deleteing",
    });
  }
};
module.exports = { createTodo, getTodos, updateTodo, deleteTodo };
