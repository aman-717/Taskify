const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../model/user.model.js");
require("dotenv").config();
const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.jwt; // Read token from cookies
    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT); // Verify token
    const user = await User.findById(decoded.userId); // Find user in DB

    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    req.user = user; // Attach user to request object
    next(); // Move to the next middleware
  } catch (error) {
    res.status(401).json({ success: false, message: "Invalid Token" });
  }
};

module.exports = authenticate;
