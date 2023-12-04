const mongoose = require("mongoose");

const Course = require("./Course");
const CourseStudent = require("./CourseStudent");
const CourseDetail = require("./CourseDetail");
const Program = require("./Program");
const Department = require("./Department");

const getCourse = {
  student: (id) => {
    return CourseStudent.findByStudentId(id);
  },
  teacher: async (id) => {
    console.log(id)
    const dept = await Department.findByHeads(id);
    //is department head
    if (dept) {
      const courses = await Course.findByDept(dept.id);
      return courses;
    }
    //is prgrom leader
    const prog = await Program.findByLeaders(id);
    if (prog) {
      const course = [];
      for (var i = 0; i < [...prog].length; i++) {
        //console.log(prog[i].course);
        for (var j = 0; j < prog[i].course.length; j++) {
          const c = await Course.findByCourseId(prog[i].course[j]);
          course.push(c);
        }
      }
      return course;
    }
    //is course leader
    const cs = await CourseDetail.findByTeacher(id);
    if (cs) {
      const course = [];
      for (var i = 0; i < [...cs].length; i++) {
        if (
          course.filter(c => {
            c.id == cs[i].id;
          }).length < 0
        ) {
          const temp = await Course.findByCourseId(cs[i].id);
          course.push(temp);
        }
      }
      return course;
    }
    const tutorCS = await CourseDetail.findByTutor(id);
    const course = [];
    for (var i = 0; i < [...cs].length; i++) {
      if (
        course.filter(c => {
          c.id == cs[i].id;
        }).length < 0
      ) {
        const temp = await Course.findByCourseId(tutorCS[i].id);
        course.push(temp);
      }
    }
    return course;
  },
  admin: () => {
    return Course.find();
  },
};

const getCourseFactory = role => {
  if (role == "admin") return getCourse.admin;
  if (role == "teacher") return getCourse.teacher;
  return getCourse.student;
};

const userSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["student", "teacher", "admin"],
    required: true,
  },
  name: { type: String },
  department: { type: String },
  major: { type: String }, //if teacher just ""
  progYear: { type: String }, //e.g. "year3 entry", if teacher ""
  dateFrom: { type: String }, //date of join HKMU
  dateTo: { type: String }, //date of expected graduate, if teacher just ""
  email: { type: String },
  phoneNo: { type: String },
  emergencyPhoneNo: { type: String },
});

//------------------Function start------------------

userSchema.statics.findByUserId = function (userId) {
  //find by id
  return this.findOne({ id: userId });
};

userSchema.statics.findByRole = function (role) {
  //find by role
  return this.find({ role: role });
};

userSchema.statics.findByName = function (name) {
  //find by name
  return this.find({ name: name });
};

userSchema.statics.findByDept = function (dept) {
  //find by department
  return this.find({ department: dept });
};

userSchema.statics.findByMajor = function (major) {
  //find by major
  return this.find({ major: major });
};

userSchema.statics.findBydateFrom = function (date) {
  //find by date start
  return this.find({ dateFrom: date });
};

userSchema.statics.findBydateTo = function (date) {
  //find by date expected graduate
  return this.find({ dateTo: date });
};

userSchema.statics.findByEmail = function (email) {
  //find by email
  return this.find({ email: email });
};

userSchema.methods.getRole = function () {
  console.log(`Role:${this.role}`)
  return { getCourse: getCourseFactory(this.role) };
};

module.exports = mongoose.model("User", userSchema);
