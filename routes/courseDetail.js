const express = require('express');
const router = express.Router();
const CourseDetail = require('../models/CourseDetail');

// Create a new course detail
router.post('/', async (req, res) => {
  try {
    const courseDetail = await CourseDetail.create(req.body);
    res.status(201).json(courseDetail);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all course details
router.get('/', async (req, res) => {
  try {
    const courseDetails = await CourseDetail.find();
    res.json(courseDetails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single course detail by ID, semester, and year
router.get('/:id/:sem/:year', async (req, res) => {
  try {
    const { id, sem, year } = req.params;
    const courseDetail = await CourseDetail.findOne({ id, sem, year });
    if (!courseDetail) {
      return res.status(404).json({ error: 'Course detail not found' });
    }
    res.json(courseDetail);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a course detail by ID, semester, and year
router.put('/:id/:sem/:year', async (req, res) => {
  try {
    const { id, sem, year } = req.params;
    const courseDetail = await CourseDetail.findOneAndUpdate(
      { id, sem, year },
      req.body,
      { new: true }
    );
    if (!courseDetail) {
      return res.status(404).json({ error: 'Course detail not found' });
    }
    res.json(courseDetail);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a course detail by ID, semester, and year
router.delete('/:id/:sem/:year', async (req, res) => {
  try {
    const { id, sem, year } = req.params;
    const courseDetail = await CourseDetail.findOneAndDelete({ id, sem, year });
    if (!courseDetail) {
      return res.status(404).json({ error: 'Course detail not found' });
    }
    res.json({ message: 'Course detail deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;