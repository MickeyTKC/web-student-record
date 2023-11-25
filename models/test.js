const mongoose = require('mongoose')
const User = require("./User");

const dbName = "SE_Project"
const url = `mongodb+srv://seprojectCollect:thisISpassword@cluster0.eknv0ni.mongodb.net/${dbName}`;

mongoose.set("strictQuery",true)


mongoose.connect(url)

const run = async () =>{
    var users = await User.find();
    console.log(users)
}

run();
console.log("finished")