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
const auth = {
  isLogin: (req, res, next) => {
    if (!req.session.userId)
      return next({ statusCode: 401, message: "Login is required." });
  },
};

//APIs
app.use("/api", routes);

//Views
app.get("/",(req,res,next)=>{
    
})
app.get("/login",(req,res,next)=>{
    
})
app.get("/personal",(req,res,next)=>{

})
app.get("/course",(req,res,next)=>{

})
app.get("/course/id/:id",(req,res,next)=>{

})
app.get("/course/id/:id/edit",(req,res,next)=>{

})
app.get("/program/id/:id",(req,res,next)=>{

})
app.get("/program/id/:id/edit",(req,res,next)=>{

})
app.get("/admin",(req,res,next)=>{

})
//Error Handler
app.get("/*", (req, res, next) => {
  return next({ statusCode: 404, message: "Not Found" });
});
app.use((err, req, res, next) => {
  if (err.statusCode == 401) res.redirect("/login");
  else
    res
      .status(err.statusCode)
      .render("../views/error.ejs", { err: err, auth: req.session || {} });
});

//Server Start
app.listen(port, function () {
  console.log(`server is runing on ${port}`);
});
