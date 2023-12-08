const express = require('express');
const router = express.Router();
const CourseDetail = require('../models/CourseDetail');
const Course = require('../models/Course');

// Create a new course detail
router.post('/', async (req, res) => {
  try {
    const {id,year,sem,teacher} = req.body
    const cd = await CourseDetail.findByCourseYearSem(id,year,sem)
    if(cd){
      return res.status(400).json({error:"Course Detail already exist"})
    }
    const course = await Course.findByCourseId(id)
    if(!course){
      return res.status(400).json({error:"Course does not exist"})
    }
    const name = course.name;
    const courseDetail = await CourseDetail.create({id,name,year,sem,teacher});
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
router.get('/:id/:year/:sem', async (req, res) => {
  try {
    const { id, sem, year } = req.params;
    const courseDetail = await CourseDetail.findByCourseYearSem(id, year, sem);
    if (!courseDetail) {
      return res.status(404).json({ error: 'Course detail not found' });
    }
    res.json(courseDetail);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a course detail by ID, semester, and year
router.put('/:id/:year/:sem', async (req, res) => {
  try {
    var { id, sem, year } = req.params;
    sem = sem.replace(":","");
    const courseDetail = await CourseDetail.findByCourseYearSem(id, year, sem);
    console.log({ id, sem, year })
    if (!courseDetail) {
      return res.status(404).json({ error: 'Course detail not found' });
    }
    var { teacher } = req.body
    if(!year || !sem || !teacher){
      return res.status(400).json({ error: 'year, sem, teacher cannot be empty' });
    }
    const courseDetailEdit = new CourseDetail(courseDetail);
    courseDetailEdit.teacher = teacher
    await courseDetailEdit.save()
    res.json(courseDetailEdit);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a course detail by ID, semester, and year
router.delete('/:id/:year/:sem', async (req, res) => {
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