const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../model/user.model.js");
require("dotenv").config();
const authenticate = async (req, res, next) => {
  const token = req.cookies.jwt;
  console.log("jwt middleware", token);
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT);
    // console.log(decoded);
    req.user = await User.findById(decoded.userId);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error in JWT verification",
    });
  }
  next();
};
module.exports = authenticate;
