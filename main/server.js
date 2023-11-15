const express = require("express");
const app= express();
const mongoose=require("mongoose");
const bodyParser =require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
const path = require('path');
app.set('view engine', 'ejs');
app.use(express.static('views'));
// Set the views directory path
app.set('views', path.join(__dirname, 'views'));

mongoose.connect("mongodb+srv://callofduty9065:AH64ah1z@cluster0.dtrlpre.mongodb.net/groupproject")

app.get("/",(req, res) =>{
    res.redirect("index");
})

app.get("/index",(req,res) =>{
    res.render('index',{});

})
app.listen(3000,function(){
    console.log("server is runing on 3000");
})