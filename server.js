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
const auth = require("./routes/auth")

//APIs
app.use("/api", routes);

//Views
app.get("/", auth.isLogin, async (req, res, next) => {
  try {
    const client = new User(req.session.user)
    const courses = await client.getRole().getCourse(req.session.userId);
    res.status(200).render("index", { data: courses ||{}});
  } catch (e) {
    next();
  }
});
app.get("/login", (req, res, next) => {
  res.status(200).render("login");
});
app.get("/personal", (req, res, next) => {});
app.get("/course", (req, res, next) => {});
app.get("/course/id/:id", (req, res, next) => {});
app.get("/course/id/:id/edit", (req, res, next) => {});
app.get("/program/id/:id", (req, res, next) => {});
app.get("/program/id/:id/edit", (req, res, next) => {});
app.get("/admin", (req, res, next) => {});
//Error Handler
app.get("/*", (req, res, next) => {
  return next({ statusCode: 404, message: "Not Found" });
});
app.use((err, req, res, next) => {
  if (err.statusCode == 401) res.redirect("/login");
  else
    res
      .status(err.statusCode)
      .render("../views/error.ejs", { err: err});
});

//Server Start
app.listen(port, function () {
  console.log(`server is runing on ${port}`);
});
