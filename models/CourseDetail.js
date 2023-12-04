const mongoose = require("mongoose");
const Course = require("./Course");

const courseDetailSchema = new mongoose.Schema({
  id: { type: String, required: true },
  detail: [{
  year: { type: String },
  sem: { type: String },
  teacher: { type: String }, //teacher for responsible this course
  tutors: { type:[{type:String}]}
    }]
});

//------------------Function start------------------

courseDetailSchema.statics.findByCourseId = function (cId){  //find by id
    return this.find({id: cId});
}

courseDetailSchema.statics.findByYear = function (year){  //find by year
    return this.find({"detail.year": year});
}

courseDetailSchema.statics.findBySem = function (sem){  //find by sem
    return this.find({"detail.sem": sem});
}

courseDetailSchema.statics.findByCourseYearSem = function (cId, year, sem){  //find by id
    return this.findOne({id: cId, "detail.year":year, "detail.sem":sem});
}

courseDetailSchema.statics.findByTeacher = function (teacher){  //find by teacher
    return this.find({"detail.teacher": teacher});
}

courseDetailSchema.statics.findByTutor = function (tutor){  //find by tutor
    return this.find({"detail.tutors": {$elemMatch:{$in: tutor}}});
}

courseDetailSchema.methods.getCourseName = function (){
    return Course.findByCourseId(this.courseId);
}

module.exports = mongoose.model("CourseDetail", courseDetailSchema);