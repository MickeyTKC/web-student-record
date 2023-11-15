const express = require("express");
const app= express();
const mongoose=require("mongoose");
const bodyParser =require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect("mongodb+srv://callofduty9065:AH64ah1z@cluster0.dtrlpre.mongodb.net/groupproject")

app.get("/",function(req, res){
    res.send("express is working")
})

app.listen(3000,function(){
    console.log("server is runing on 3000");
})