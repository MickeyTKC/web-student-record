const express = require("express");
const router = express.Router();

const User = require("../models/User");

const isLogin = (req, res, next) => {
  if (!req.session.userId)
    return next({ statusCode: 401, message: "Login is required." });
  next();
};

const isAdmin = (req, res, next) => {
  if (!req.session.userId)
    return next({ statusCode: 401, message: "Login is required." });
  if (!req.session.userId)
    return next({ statusCode: 403, message: "Admin permission is required." });
  next();
};

router.get("/", async (req, res, next) => {
  if (!req.session.user) {
    return next();
  }
});

router.post("/login", async (req, res, next) => {
  const { id, password } = req.body;
  console.log("login");
  try {
    // Find the user with the provided ID
    const user = await User.findOne({ id });
    if (!user) {
      // User does not exist, return an error response
      res.status(404).json({ message: "User not found" });
    }
    // Check if the user exists and the password matches
    if (user && user.password === password) {
      // Authentication successful, return a success response
      req.session.userId = user.id;
      req.session.user = user;
      res.status(200).json({ message: "Login successful" });
    } else {
      // Invalid credentials, return an error response

      res.status(401).json({ message: "Invalid password" });
    }
  } catch (error) {
    // Error occurred, return an error response
    return next();
  }
});

router.post("/logout", (req, res, next) => {
  try {
    // Check if the user is authenticated
    if (!req.session.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Clear the user ID from the session
    req.session = null;
    if (req.is("application/json"))
      return res.status(200).json({ message: "Logout successful" });
    return res.redirect("/login");
  } catch (error) {
    // Error occurred, return an error response
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/*", async (req, res, next) => {
  return next();
});

router.use((err, req, res, next) => {
  res.status(500).json({ message: "Internal Server Error" });
});

module.exports = { router, isLogin, isAdmin};
