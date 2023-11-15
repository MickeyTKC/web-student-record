const express = require("express");
const app= express();
const mongoose=require("mongoose");
const bodyParser =require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
const path = require('path');
app.set('view engine', 'ejs');
app.use(express.static('views'));
const session = require('cookie-session');
const MongoClient =require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
app.use(bodyParser.json());
const mongourl = "mongodb+srv://callofduty9065:AH64ah1z@cluster0.dtrlpre.mongodb.net/groupproject";


const dbName = 'account';


// Set the views directory path
app.set('views', path.join(__dirname, 'views'));


//User test
const users = new Array(
	{student_id: "11111", password:"12345" , name: "Peter", email: "peter@123.com", address: "KT,KLN",
        record: {Year1:{Art: "B", Math: "C" , English: "A" },
        Year2:{Chinese: "C", PE: "C" , Psysics: "A" }}
    },
);

app.use(
    session({
      secret: 'login',
      resave: false,
      saveUninitialized: true,
    })
  );

app.get("/",(req, res) =>{
    if (!req.session.authenticated) {    
		res.redirect('/index');
  }
  else{
    res.redirect('/trueindex');
  }
})

app.get("/index",(req,res) =>{
    res.render('index');
})

//User has login their account
app.get("/trueindex",(req,res) =>{
    res.render('trueindex');
})

app.post("/login", (req,res) => {
    var username = req.body.username;
    var password = req.body.password;
    users.forEach((user) => {
		if (user.name == username && user.password == password) {	
			req.session.authenticated = true;
			req.session.username = req.body.username;
            req.session.password = req.body.password;
		}
        console.log(req.session.authenticated);
	});
        res.redirect('main');
    //Check which identity user are
});

app.get('/login', (req,res) => {
    res.render('perinfo');
});


app.get('/main', (req,res) => {
    if (!req.session.authenticated) {    
		res.redirect('/index');
	} 
    res.status(200).render('perinfo',{name:req.session.username});
});

app.get('/logout', (req,res) => {
	req.session = null;   // clear cookie
	res.redirect('/index');
});


app.listen(3000,function(){
    console.log("server is runing on 3000");
})