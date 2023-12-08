const express = require("express");
const router = express.Router();

const Course = require("../models/Course");
const courseDetailRoute = require("./courseDetail");
const courseStudentRoute = require("./courseStudent");

// Create a new course
router.post("/", async (req, res) => {
  try {
    var { id, name, dept, intro, credit } = req.body;
    // Validate required fields
    if (!id || !name || !credit) {
      return res
        .status(400)
        .json({ error: "id, name, and credit are required" });
    }
    id = id.toLocaleUpperCase();
    const course = new Course({ id, name, dept, intro, credit });
    await course.save();
    res.status(201).json(course);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all courses
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific course by ID
router.get("/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a course by ID
router.patch("/:id", async (req, res) => {
  try {
    const { id, name, intro, credit } = req.body;

    // Validate required fields
    if (!id || !name || !credit) {
      return res
        .status(400)
        .json({ error: "id, name, and credit are required" });
    }

    const course = await Course.findByCourseId(id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    course.id = id;
    course.name = name;
    course.intro = intro;
    course.credit = credit;
    await course.save();

    res.json(course);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a course by ID
router.delete("/:id", async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json({ message: "Course deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all course details
router.use("/detail", courseDetailRoute);
router.use("/student", courseStudentRoute);

module.exports = router;
