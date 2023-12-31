const express = require("express");
const router = express.Router();

const Department = require("../models/Department");
const auth = require("./auth");

router.post("/", auth.isAdmin, async (req, res) => {
  try {
    const { id, name, intro, program, status } = req.body;
    const department = new Department({ id, name, intro, program, status });
    await department.save();
    res.status(201).json(department);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const departments = await Department.find();
    res.json(departments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }
    res.json(department);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.patch("/:id", auth.isLogin, async (req, res) => {
  try {
    const right = await Department.findByHeads(req.session.userId);
    if (!right && req.session.user.role != "admin")
      return res.status(403).json({ message: "No Permission" });
    const data = req.body;
    const department = await Department.findByIdAndUpdate(
      req.params.id,
      data,
      { new: true }
    );
    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }
    res.json(department);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", auth.isAdmin, async (req, res) => {
  try {
    const department = await Department.findByIdAndDelete(req.params.id);
    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }
    res.json({ message: "Department deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
