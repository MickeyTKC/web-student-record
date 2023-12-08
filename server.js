//Lib
const express = require("express");
const app = express();
const session = require("cookie-session");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const assert = require("assert");

//Env
require("dotenv").config();

//Constance
const port = 3000;
const secret = process.env.secret;
const dbName = process.env.db_name;
const url = process.env.db_url + dbName;

//Config
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: secret, resave: false, saveUninitialized: true }));
app.use(express.static("public"));
app.use(express.json());

//Models
const User = require("./models/User");
const Program = require("./models/Program");
const Course = require("./models/Course");
const Department = require("./models/Department");
const CourseDetail = require("./models/CourseDetail");
const CourseStudent = require("./models/CourseStudent");
//Routes
const routes = require("./routes");

//DB Connection
mongoose.set("strictQuery", true);
mongoose.connect(url).then(() => {
  console.log("MongoDB connected successfully");
});
mongoose.connection.on("error", err => {
  throw new Error("Mongo database connexion error");
});

//Right Auth
const auth = require("./routes/auth");

//APIs
app.use("/api", routes);

//Views

//Home
app.get("/", auth.isLogin, async (req, res, next) => {
  try {
    const auth = req.session.user;
    res.status(200).render("index", {
      auth: auth,
    });
  } catch (e) {
    next();
  }
});

//login
app.get("/login", (req, res, next) => {
  res.status(200).render("login");
});

//personal information
app.get("/profile", auth.isLogin, async (req, res, next) => {
  const id = req.session.userId;
  try {
    const auth = req.session.user;
    const personalInfo = await User.findByUserId(id);
    res.status(200).render("profile", { data: personalInfo || {}, auth: auth });
  } catch (e) {
    return next();
  }
});

app.get("/profile/edit", auth.isLogin, async (req, res, next) => {
  const id = req.session.userId;
  try {
    const auth = req.session.user;
    const user = await User.findByUserId(id);
    res.status(200).render("profileEdit", { data: user || {}, auth: auth , url:"/api/user/profile/edit"});
  } catch (e) {
    next();
  }
});

//course
app.get("/course", auth.isLogin, async (req, res, next) => {
  try {
    const auth = req.session.user;
    const client = new User(req.session.user);
    const courses = await client.getRole().getCourse(req.session.userId);
    res.status(200).render("courses", { data: courses || [], auth: auth });
  } catch (e) {
    next();
  }
});

app.get("/course/add", auth.isLogin, async (req, res, next) => {
  try {
    const auth = req.session.user;
    res.status(200).render("courseAdd", {
      auth: auth,
      url:"/api/course"
    });
  } catch (e) {
    next();
  }
});

app.get("/course/:id", auth.isLogin, async (req, res, next) => {
  try {
    const auth = req.session.user;
    const course = await Course.findByCourseId(req.params.id);
    res.status(200).render("course", { data: course || {}, auth: auth });
  } catch (e) {
    next();
  }
});

app.get("/course/:id/edit", auth.isLogin, async (req, res, next) => {
  try {
    const auth = req.session.user;
    const course = await Course.findByCourseId(req.params.id);
    res.status(200).render("courseEdit", {
      data: course || {},
      auth: auth,
      url: `/api/course/${req.params.id}`
    });
  } catch (e) {
    next();
  }
});

// course details

app.get("/course/:id/add", auth.isNotStudent, async (req, res, next) => {
  try {
    const auth = req.session.user;
    const course = await Course.findByCourseId(req.params.id);
    res.status(200).render("courseDetailAdd", { data: course, auth: auth });
  } catch (e) {
    next();
  }
});

app.get("/course/:id/:year/:sem", auth.isNotStudent, async (req, res, next) => {
  try {
    const auth = req.session.user;
    const { id, year, sem } = req.params;
    const courseDetail = await CourseDetail.findByCourseYearSem(id, year, sem);
    res
      .status(200)
      .render("courseDetail", { data: courseDetail || {}, auth: auth });
  } catch (e) {
    next();
  }
});

app.get(
  "/course/:id/:year/:sem/edit",
  auth.isNotStudent,
  async (req, res, next) => {
    try {
      const auth = req.session.user;
      const { id, year, sem } = req.params;
      const courseDetail = await CourseDetail.findByCourseYearSem(
        id,
        year,
        sem
      );
      res
        .status(200)
        .render("courseDetailEdit", { data: courseDetail || {}, auth: auth });
    } catch (e) {
      next();
    }
  }
);

// coruse student records
app.get(
  "/course/:id/:year/:sem/students/add",
  auth.isNotStudent,
  async (req, res, next) => {
    try {
      const auth = req.session.user;
      const { id, year, sem } = req.params;
      res
        .status(200)
        .render("courseStudentAdd", { data: courseStudent || [], auth: auth });
    } catch (e) {
      next();
    }
  }
);
app.get(
  "/course/:id/:year/:sem/students",
  auth.isNotStudent,
  async (req, res, next) => {
    try {
      const auth = req.session.user;
      const { id, year, sem } = req.params;
      const courseStudent = await CourseStudent.findByCourseYearSem(
        id,
        year,
        sem
      );
      res
        .status(200)
        .render("courseStudent", { data: courseStudent || [], auth: auth });
    } catch (e) {
      next();
    }
  }
);
app.get(
  "/course/:id/:year/:sem/:student",
  auth.isNotStudent,
  async (req, res, next) => {
    try {
      const auth = req.session.user;
      const { id, year, sem, student } = req.params;
      const courseStudent = await CourseStudent.findByUserIdCourseIdYearSem(
        student,
        id,
        year,
        sem
      );
      res
        .status(200)
        .render("courseStudentEdit", { data: courseStudent || {}, auth: auth , url: `/api/course/student/${student}/${id}/${year}/${sem}`});
    } catch (e) {
      next();
    }
  }
);

app.get("/programs/", auth.isLogin, async (req, res, next) => {
  try {
    const auth = req.session.user;
    const { role } = req.session.user;
    if (role != "admin") {
      return next({
        statusCode: 403,
        message: "Admin permission is required.",
      });
    }
    const prog = await Program.find();
    res.status(200).render("programs", { data: prog || [], auth: auth });
  } catch (e) {
    next();
  }
});

app.get("/program/add", auth.isAdmin, async (req, res, next) => {
  try {
    const auth = req.session.user;
    res.status(200).render("programAdd", { auth: auth ,url:"/api/program"});
  } catch (e) {
    next();
  }
});

app.get("/program/:id", auth.isLogin, async (req, res, next) => {
  try {
    const auth = req.session.user;
    const prog = await Program.findByProgId(req.params.id);
    res.status(200).render("program", { data: prog || {}, auth: auth });
  } catch (e) {
    next();
  }
});

app.get("/program/:id/edit", auth.isNotStudent, async (req, res, next) => {
  try {
    const auth = req.session.user;
    const prog = await Program.findByProgId(req.params.id);
    prog.allCourses = await Course.find() || [];
    prog.allTeachers = await User.find({role:"teacher"}) || []
    res.status(200).render("programEdit", { data: prog || {}, auth: auth, url:`/api/program/${req.params.id}`});
  } catch (e) {
    next();
  }
});

app.get("/academic", auth.isLogin, async (req, res, next) => {
  try {
    const auth = req.session.user;
    const courseStudent = await CourseStudent.findByStudentId(
      req.session.userId
    );
    res
      .status(200)
      .render("academic", { data: courseStudent || [], auth: auth || {} });
  } catch (e) {
    next();
  }
});

app.get("/dashboard", auth.isNotStudent, async (req, res, next) => {
  var courseDetail = [];
  const { id, role } = req.session.user;
  if (role == "student") {
    return next({ statusCode: 403, message: "Admin permission is required." });
  }
  const auth = req.session.user;
  try {
    if (role == "admin") {
      courseDetail = await CourseDetail.find();
    } else {
      courseDetail = await CourseDetail.findByTeacher(id);
    }
  } catch (e) {
    return next();
  }
  res
    .status(200)
    .render("dashb", { data: courseDetail || [], auth: auth || {} });
});

app.get("/users/", auth.isAdmin, async (req, res, next) => {
  try {
    const auth = req.session.user;
    const { role } = req.session.user || {};
    if (role != "admin") {
      return next({
        statusCode: 403,
        message: "Admin permission is required.",
      });
    }
    const user = await User.find();
    res.status(200).render("users", { data: user || [], auth: auth });
  } catch (e) {
    next();
  }
});

app.get("/user/add", auth.isAdmin, async (req, res, next) => {
  try {
    const auth = req.session.user;
    res.status(200).render("userAdd", { auth: auth, url:"/user"});
  } catch (e) {
    next();
  }
});

app.get("/user/:id", auth.isNotStudent, async (req, res, next) => {
  try {
    const auth = req.session.user;
    const user = await User.findByUserId(req.params.id);
    res.status(200).render("user", { data: user || {}, auth: auth });
  } catch (e) {
    next();
  }
});

app.get("/user/:id/edit", auth.isAdmin, async (req, res, next) => {
  try {
    const auth = req.session.user;
    const user = await User.findByUserId(req.params.id);
    res.status(200).render("userEdit", { data: user || {}, auth: auth , url: `/user/${id}` });
  } catch (e) {
    next();
  }
});

//Error Handler
app.get("/*", (req, res, next) => {
  return next({ statusCode: 404, message: "Not Found" });
});

app.use((err, req, res, next) => {
  if (err.statusCode == 401) res.redirect("/login");
  else {
    const auth = req.session.user;
    res
      .status(err.statusCode)
      .render("../views/error.ejs", { err: err, auth: auth });
  }
});

//Server Start
app.listen(port, function () {
  console.log(`server is runing on ${port}`);
});
