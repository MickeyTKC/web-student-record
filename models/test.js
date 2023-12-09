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


mongoose.set("strictQuery",true)


mongoose.connect(url)

const run = async () =>{
    var users = await User.find();
    console.log(users)
}

run();
console.log("finished")