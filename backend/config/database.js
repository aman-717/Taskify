const mongoose = require("mongoose");
require("dotenv").config();
dbConnect = () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log("Database is connectd successfully");
    })
    .catch((error) => {
      console.log("Database is not connected successfully");
      console.log(error);
      process.exit(1);
    });
};
module.exports = dbConnect;
