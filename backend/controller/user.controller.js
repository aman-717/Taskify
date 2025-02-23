const User = require("../model/user.model.js");
const z = require("zod");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const generateTokenAndSaveInCookies = require("../jwt/token.js");
const userSchema = z.object({
  email: z.string().email({ message: "Invalid Email Address" }),
  username: z
    .string()
    .min(3, { message: "Username more than 3 character" })
    .max(20),
  password: z
    .string()
    .min(8, { message: "Password more than 8 character" })
    .max(30),
});
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!email || !username || !password) {
      return res.status(400).json({
        success: false,
        error: "All fields required",
      });
    }
    const validation = userSchema.safeParse({ email, password, username });
    if (!validation.success) {
      const errorMessage = validation.error.errors.map((err) => err.message);
      return res.status(400).json({
        error: errorMessage,
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        error: "User Registered Already",
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashPassword, username });
    await newUser.save();
    if (newUser) {
      const token = await generateTokenAndSaveInCookies(newUser._id, res);
      res.status(201).json({
        success: true,
        message: "User Registered Successfully",
        newUser,
        token,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in Registering New User",
    });
  }
};
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields required",
      });
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({
        success: false,
        error: "Invalid email or password",
      });
    }
    const token = await generateTokenAndSaveInCookies(user._id, res);
    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in logging User",
    });
  }
};
const logout = (req, res) => {
  try {
    res.clearCookie("jwt", {
      path: "/",
    });
    res.status(200).json({
      success: true,
      message: "User Logout successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in logout User",
    });
  }
};
module.exports = { register, login, logout };
