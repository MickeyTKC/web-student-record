const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String },
  intro: { type: String },
  program: { type:[{type:String}]}
});

//------------------Function start------------------

courseSchema.statics.findByCourseId = function (cId){  //find by id
    return this.findOne({id: cId});
}

courseSchema.statics.findByName = function (name){  //find by name
    return this.findOne({name: name});
}

courseSchema.statics.findByProgram = function (prog){  //find by prog
    return this.find({program: prog});
}

module.exports = mongoose.model("Course", courseSchema);