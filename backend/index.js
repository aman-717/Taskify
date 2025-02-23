const express = require("express");
const app = express();
const cors = require("cors");
const todoRoute = require("./routes/todo.routes.js");
const userRoute = require("./routes/user.routes.js");
require("dotenv").config();
const port = process.env.PORT || 4002;
const cookieParser = require("cookie-parser");
//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: ["Content-type", "Authorization"],
  })
);
const dbConnect = require("./config/database");
dbConnect();
app.get("/", (req, res) => {
  res.send("This is home page");
});
app.use("/todo", todoRoute);
app.use("/user", userRoute);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
