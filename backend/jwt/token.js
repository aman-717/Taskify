const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../model/user.model.js");
const generateTokenAndSaveInCookies = async (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT, {
    expiresIn: "10d",
    // new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
  });
  res.cookie("jwt", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production", // Only secure in production
  sameSite: "strict",
  path: "/",
});


  await User.findByIdAndUpdate(userId, { token });
  return token;
};
module.exports = generateTokenAndSaveInCookies;
