const express = require('express');
const router = express.Router();
const CourseStudent = require('../models/CourseStudent');
const Course = require('../models/Course');

// Create a new course student
router.post('/', async (req, res) => {
  try {
    const {courseId,year,sem,students} = req.body;
    if(!students){
      return res.status(400).json({ error: "student does not exist" });
    }
    const courseRecord = await Course.findByCourseId(courseId||"")
    if(!courseRecord){
      return res.status(400).json({ error: "course does not exist" });
    }
    const studentRecord = await CourseStudent.findByCourseIdYearSem(courseId,year,sem)
    students.forEach(async std=>{
      if(studentRecord.filter(sr=>{return sr.studentId == std}).length<=0){
        const studentId = std;
        const grade = {final:"In Progress",items:[]}
        const {name,credit} = courseRecord 
        const newStudentRecord = new CourseStudent({studentId,courseId,name,year,sem,credit,grade})
        await newStudentRecord.save()
      }else{
        console.log("already exist")
      }
    })
    res.status(200).json(await CourseStudent.findByCourseIdYearSem(courseId,year,sem))
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
router.get('/:studentId/:courseId/:year/:sem', async (req, res) => {
  try {
    const { studentId, courseId, year, sem } = req.params;
    const courseStudent = await CourseStudent.findByUserIdCourseIdYearSem(studentId, courseId, year, sem );
    if (!courseStudent) {
      return res.status(404).json({ error: 'Course student not found' });
    }
    res.json(courseStudent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a course student by student ID, course ID, semester, and year
router.put('/:studentId/:courseId/:year/:sem', async (req, res) => {
  try {
    const { studentId, courseId, year, sem } = req.params;
    const courseStudent = new CourseStudent(await CourseStudent.findByUserIdCourseIdYearSem(studentId, courseId, year, sem )) ;
    if (!courseStudent) {
      return res.status(404).json({ error: 'Course student not found' });
    }
    const { finalGrade } = req.body
    const correctGrade = ["A+","A","A-","B+","B","B-","C","D","F","In Progress"]
    if(!correctGrade.includes(finalGrade)){
      return res.status(400).json({ error: 'Enter Corrrect Grade' });
    }
    courseStudent.grade.final = finalGrade
    await courseStudent.save()
    res.json(courseStudent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a course student by student ID, course ID, semester, and year
router.delete('/:studentId/:courseId/:year/:sem', async (req, res) => {
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