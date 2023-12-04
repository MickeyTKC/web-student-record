const mongoose = require('mongoose')
const User = require("./User");
const Program = require("./Program");
const Course = require("./Course");
const Department = require("./Department");
const CourseDetail = require("./CourseDetail");
const CourseStudent = require("./CourseStudent");
const fs = require("fs");

require("dotenv").config();
const dbName = process.env.db_name;
const url = process.env.db_url + dbName;

mongoose.set("strictQuery", true)


mongoose.connect(url)
console.log(mongoose.connection.readyState);

//User
const deleteAndCreateUsers = async () => {
    try {
      await User.deleteMany({});
      console.log("Del user");
      const users = JSON.parse(fs.readFileSync("./sampleData/SE_Project.users.json", "utf-8"));
      const createdUsers = await User.insertMany(users);
      //console.log('New users created:', createdUsers);
      console.log('New users created');
    } catch (error) {
      console.error('Error:', error);
    }
}

//Dept
const deleteAndCreateDepts = async () => {
    try {
      await Department.deleteMany({});
      console.log("Del dept");
      const depts = JSON.parse(fs.readFileSync("./sampleData/SE_Project.departments.json", "utf-8"));
      await Department.insertMany(depts);
      console.log('New dept created');
    } catch (error) {
      console.error('Error:', error);
    }
}

//Course
const deleteAndCreateCourses = async () => {
    try {
      await Course.deleteMany({});
      console.log("Del course");
      const courses = JSON.parse(fs.readFileSync("./sampleData/SE_Project.courses.json", "utf-8"));
      await Course.insertMany(courses);
      console.log('New course created');
    } catch (error) {
      console.error('Error:', error);
    }
}

//Program
const deleteAndCreatePrograms = async () => {
    try {
      await Program.deleteMany({});
      console.log("Del prog");
      const courses = JSON.parse(fs.readFileSync("./sampleData/SE_Project.programs.json", "utf-8"));
      await Program.insertMany(courses);
      console.log('New prog created');
    } catch (error) {
      console.error('Error:', error);
    }
}

//CourseDetails
const deleteAndCreateCourseDetails = async () => {
    try {
      await CourseDetail.deleteMany({});
      console.log("Del courseDetail");
      const courDet = JSON.parse(fs.readFileSync("./sampleData/SE_Project.courseDetails.json", "utf-8"));
      await CourseDetail.insertMany(courDet);
      console.log('New courseDetail created');
    } catch (error) {
      console.error('Error:', error);
    }
}

//CourseStudents
const deleteAndCreateCourseStudents = async () => {
    try {
      await CourseStudent.deleteMany({});
      console.log("Del courseStudent");
      const courStud = JSON.parse(fs.readFileSync("./sampleData/SE_Project.courseStudents.json", "utf-8"));
      const data = await CourseStudent.insertMany(courStud);
      
      console.log('New courseStudent created');
    } catch (error) {
      console.error('Error:', error);
    }
}


const setupData = async () => {
    try {
        deleteAndCreateUsers();
        deleteAndCreateDepts();
        deleteAndCreateCourses();
        deleteAndCreatePrograms();
        deleteAndCreateCourseDetails();
        deleteAndCreateCourseStudents();
        console.log('finish');
        const test = await CourseStudent.find();
        console.log(test);
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  //setupData();
  const yesy = async () => {
    try {
        const test = await CourseStudent.findByCourseId("EE2004");
        //console.log(test);
        const erere = new CourseStudent(test);
        console.log(erere);
    } catch (error) {
      console.error('Error:', error);
    }
  }
  yesy();
