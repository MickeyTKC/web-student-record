const express = require("express");
const router = express.Router();

const auth = require("./auth");
const User = require("../models/User");

// Create a new user
router.post("/", auth.isAdmin, async (req, res) => {
  try {
    const {
      id,
      password,
      role,
      name,
      department,
      major,
      progYear,
      dateFrom,
      dateTo,
      email,
      phoneNo,
      emergencyPhoneNo,
    } = req.body;

    // Validate required fields
    if (!id || !password || !role) {
      return res
        .status(400)
        .json({ error: "id, password, and role are required" });
    }

    const user = new User({
      id,
      password,
      role,
      name,
      department,
      major,
      progYear,
      dateFrom,
      dateTo,
      email,
      phoneNo,
      emergencyPhoneNo,
    });

    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all users
router.get("/", auth.isAdmin, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific user by ID
router.get("/:id", auth.isAdmin, async (req, res) => {
  try {
    const user = await User.findByUserId(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.patch("/profile/edit", auth.isLogin, async (req, res) => {
  const {userId} = req.session;
  try {
    const {
      email,
      phoneNo,
      emergencyPhoneNo,
    } = req.body;
    const user = new User(await User.findByUserId(userId));
    if (!user) return res.status(404).json({ message: "User not found" });
    user.email = email || user.email;
    user.phoneNo = phoneNo || user.phoneNo;
    user.emergencyPhoneNo = emergencyPhoneNo || user.emergencyPhoneNo;
    user.save();
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
})

// Update a user by ID
router.patch("/:id", auth.isLogin, async (req, res) => {
  const id = req.params.id;

  try {
    const {
      password,
      role,
      name,
      department,
      major,
      progYear,
      dateFrom,
      dateTo,
      email,
      phoneNo,
      emergencyPhoneNo,
    } = req.body;

    // Validate required fields
    if (!id || !role) {
      return res
        .status(400)
        .json({ error: "id, password, and role are required" });
    }

    const user = new User(await User.findByUserId(id));
    if (!user) return res.status(404).json({ message: "User not found" });

    user.password = password || user.password;
    user.role = role || user.role;
    user.name = name || user.name;
    user.department = department || user.department;
    user.major = major || user.major;
    user.progYear = progYear || user.progYear;
    user.dateFrom = dateFrom || user.dateFrom;
    user.dateTo = dateTo || user.dateTo;
    user.email = email || user.email;
    user.phoneNo = phoneNo || user.phoneNo;
    user.emergencyPhoneNo = emergencyPhoneNo || user.emergencyPhoneNo;
    user.save();
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.patch("/:id/password", auth.isLogin, async (req, res) => {
  try {
    const id = req.params.id;

    const { password } = req.body;
    // Validate required fields
    if (!id) {
      return res
        .status(400)
        .json({ error: "id, password, and role are required" });
    }
    const user = new User(await User.findByUserId(id));
    if (!user) return res.status(404).json({ message: "User not found" });
    user.password = password;
    user.save();
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a user by ID
router.delete("/:id", auth.isAdmin, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
