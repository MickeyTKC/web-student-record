const express = require("express");
const router = express.Router();

const Program = require("../models/Program");
const Department = require("../models/Department");

// Create new program
router.post("/", async (req, res) => {
  try {
    const { id, name, dept, intro } = req.body;
    // Validate required fields
    if (!id || !name) {
      return res.status(400).json({ error: "id & name is required" });
    }
    const checkDept = Department.findByDeptId(dept);
    if(!checkDept){
        return res.status(400).json({ error: "correct dept is required" });
    }
    // Create a new program document
    const program = new Program({ id, name, dept, intro });
    await program.save();
    res.status(201).json(program);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const programs = await Program.find();
    res.json(programs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/id/:id", async (req, res) => {
  try {
    const program = await Program.findById(req.params.id);
    if (!program) {
      return res.status(404).json({ message: "Program not found" });
    }
    res.json(program);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.patch("/programs/:id", async (req, res) => {
  try {
    const data = req.body;
    const { id, name, dept, intro } = req.body;
    const checkDept = Department.findByDeptId(dept);
    if(!checkDept){
        return res.status(400).json({ error: "correct dept is required" });
    }
    const program = await Program.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });
    if (!program) {
      return res.status(404).json({ message: "Program not found" });
    }
    res.json(program);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/programs/:id", async (req, res) => {
  try {
    const program = await Program.findByIdAndDelete(req.params.id);
    if (!program) {
      return res.status(404).json({ message: "Program not found" });
    }
    res.json({ message: "Program deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
