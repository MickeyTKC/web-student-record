const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String },
  intro: { type: String },
  credit: { type: Number } //this course credit e.g. 3/4/5/10...
});

//------------------Function start------------------

courseSchema.statics.findByCourseId = function (cId){  //find by id
    return this.findOne({id: cId});
}

courseSchema.statics.findByName = function (name){  //find by name
    return this.findOne({name: name});
}

module.exports = mongoose.model("Course", courseSchema);