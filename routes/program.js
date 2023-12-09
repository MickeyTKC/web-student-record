const express = require("express");
const router = express.Router();

const auth = require("./auth");
const Program = require("../models/Program");
const Department = require("../models/Department");

// Create new program
router.post("/", auth.isAdmin, async (req, res) => {
  try {
    const { id, name, dept, intro } = req.body;
    const status = "inactive";
    const yearFrom = new Date().getFullYear()
    // Validate required fields
    if (!id || !name) {
      return res.status(400).json({ error: "id & name is required" });
    }
    // Check if program id exists
    const prog = await Program.findByProgId(id);
    if (prog) {
      return res.status(400).json({ error: "Program id is exisit" });
    }
    // Check if department exists
    const checkDept = await Department.findByDeptId(dept);
    if (!checkDept) {
      return res.status(400).json({ error: "correct department is required" });
    }
    // Create a new program document
    const program = new Program({ id, name, dept, intro, status, yearFrom });
    await program.save();
    res.status(201).json(program);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/", auth.isLogin, async (req, res) => {
  try {
    const programs = await Program.find();
    res.json(programs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", auth.isLogin, async (req, res) => {
  try {
    const program = await Program.findByProgId(req.params.id);
    if (!program) {
      return res.status(404).json({ message: "Program not found" });
    }
    res.json(program);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.patch("/:id", auth.isNotStudent, async (req, res) => {
  try {
    const { name, dept, intro, credit, leaders, course, status } = req.body;
    const checkDept = Department.findByDeptId(dept);
    if (!checkDept) {
      return res.status(400).json({ error: "correct dept is required" });
    }
    const program = new Program(await Program.findByProgId(req.params.id));
    if (!program) {
      return res.status(404).json({ message: "Program not found" });
    }
    program.dept = dept;
    program.name = name ? name: program.name;
    program.intro = intro ? intro: program.intro;
    program.credit = credit ? credit: program.credit;
    program.leaders = leaders ? leaders: program.leaders;
    program.course = course ? course: program.course;
    program.status = status ? status: program.status;
    await program.save()
    res.json(program);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/*
router.delete("/programs/:id", auth.isAdmin, async (req, res) => {
  try {
    const program = await Program.findByProgId(req.params.id);
    if (!program) {
      return res.status(404).json({ message: "Program not found" });
    }
    res.json({ message: "Program deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
*/

module.exports = router;
