const express = require('express');
const router = express.Router();
const CourseStudent = require('../models/CourseStudent');

// Create a new course student
router.post('/', async (req, res) => {
  try {
    const courseStudent = await CourseStudent.create(req.body);
    res.status(201).json(courseStudent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all course students
router.get('/', async (req, res) => {
  try {
    const courseStudents = await CourseStudent.find();
    res.json(courseStudents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single course student by student ID, course ID, semester, and year
router.get('/:studentId/:courseId/:sem/:year', async (req, res) => {
  try {
    const { studentId, courseId, sem, year } = req.params;
    const courseStudent = await CourseStudent.findOne({ studentId, courseId, sem, year });
    if (!courseStudent) {
      return res.status(404).json({ error: 'Course student not found' });
    }
    res.json(courseStudent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a course student by student ID, course ID, semester, and year
router.put('/:studentId/:courseId/:sem/:year', async (req, res) => {
  try {
    const { studentId, courseId, sem, year } = req.params;
    const courseStudent = await CourseStudent.findOneAndUpdate(
      { studentId, courseId, sem, year },
      req.body,
      { new: true }
    );
    if (!courseStudent) {
      return res.status(404).json({ error: 'Course student not found' });
    }
    res.json(courseStudent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a course student by student ID, course ID, semester, and year
router.delete('/:studentId/:courseId/:sem/:year', async (req, res) => {
  try {
    const { studentId, courseId, sem, year } = req.params;
    const courseStudent = await CourseStudent.findOneAndDelete({ studentId, courseId, sem, year });
    if (!courseStudent) {
      return res.status(404).json({ error: 'Course student not found' });
    }
    res.json({ message: 'Course student deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;