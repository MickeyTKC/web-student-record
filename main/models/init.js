const mongoose = require('mongoose')
const User = require("./User");
const Program = require("./Program");
const Course = require("./Course");
const Department = require("./Department");
const CourseDetail = require("./CourseDetail");
const CourseStudent = require("./CourseStudent");
const fs = require("fs");

const dbName = "SE_Project"
const url = `mongodb+srv://seprojectCollect:thisISpassword@cluster0.eknv0ni.mongodb.net/${dbName}`;

mongoose.set("strictQuery", true)


mongoose.connect(url)
console.log(mongoose.connection.readyState);

const deleteAndCreateUsers = async () => {
    try {
      await User.deleteMany({});
      console.log("Del user");
      const users = JSON.parse(fs.readFileSync("./main/sampleData/SE_Project.users.json", "utf-8"));
      const createdUsers = await User.insertMany(users);
      //console.log('New users created:', createdUsers);
      console.log('New users created');
    } catch (error) {
      console.error('Error:', error);
    }
}

deleteAndCreateUsers();
