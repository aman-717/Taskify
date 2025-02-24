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
    secure: true,  // Ensure the cookie is sent only over HTTPS
    sameSite: "strict", // Strict mode for better security (optional)
    path: "/",
});

  await User.findByIdAndUpdate(userId, { token });
  return token;
};
module.exports = generateTokenAndSaveInCookies;
