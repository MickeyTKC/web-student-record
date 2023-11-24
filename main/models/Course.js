const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String },
  intro: { type: String },
  credit: [{  //this course how many credit
		yearType: { type: String, enum: ["year1", "year2 entry", "year3 entry"] },
    credit: { type: Number }
  }], 
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