const mongoose = require("mongoose");
const Course = require("./Course");

const courseDetailSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String },
  year: { type: String },
  sem: { type: String },
  teacher: { type: String }, //teacher for responsible this course
  tutors: { type:[{type:String}]}
});

//------------------Function start------------------

courseDetailSchema.statics.findByCourseId = function (cId){  //find by id
    return this.find({id: cId.toLocaleUpperCase()});
}

courseDetailSchema.statics.findByCourseName = function (name){  //find by name
    return this.find({name: name});
}

courseDetailSchema.statics.findByYear = function (year){  //find by year
    return this.find({year: year});
}

courseDetailSchema.statics.findBySem = function (sem){  //find by sem
    return this.find({sem: sem});
}

courseDetailSchema.statics.findByCourseYearSem = function (cId, year, sem){  //find by id
    return this.findOne({id: cId, year:year, sem:sem});
}

courseDetailSchema.statics.findByTeacher = function (teacher){  //find by teacher
    return this.find({teacher: teacher});
}

courseDetailSchema.statics.findByTutor = function (tutor){  //find by tutor
    return this.find({tutors: {$elemMatch:{$in: tutor}}});
}


module.exports = mongoose.model("CourseDetail", courseDetailSchema);