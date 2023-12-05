const mongoose = require("mongoose");
const Course = require("./Course");

const courseStudentSchema = new mongoose.Schema({
  studentId: { type: String },
  courseId: { type: String },
  name: { type: String },
  year: { type: String },
  sem: { type: String },
  credit: { type: Number },
  grade: {
    final: { type: String }, //final grade
    items: [{   //e.g. asm, test1, test2, exam
        itemName : { type: String },
        mark: { type: Number }
    }]
    }
});

//------------------Function start------------------

/**
 * Find the course academic record by student id
 * @param {*} sid 
 * @returns 
 */
courseStudentSchema.statics.findByStudentId = function (sid){  
    return this.find({studentId: sid});
}

courseStudentSchema.statics.findByCourseId = function (cId){  //find by course id
    return this.find({courseId: cId.toLocaleUpperCase()});
}

courseStudentSchema.statics.findByCourseName = function (name){  //find by course name
    return this.find({courseName: name});
}

courseStudentSchema.statics.findByYear = function (year){  //find by year
    return this.find({year: year});
}

courseStudentSchema.statics.findBySem = function (sem){  //find by sem
    return this.find({sem: sem});
}

courseStudentSchema.statics.findByCourseIdYearSem = function (cId, year, sem){  //find by course, year, sem
    return this.find({courseId: cId, year: year, sem: sem});
}

courseStudentSchema.statics.findByUserIdCourseId = function (uId, cId){  //find by user, course id
    return this.find({studentId: uId, courseId: cId});
}

courseStudentSchema.statics.findByUserIdYear = function (userId, year){  //find by id, year
    return this.find({studentId: userId, year: year});
}


courseStudentSchema.statics.findByUserIdYearSem = function (userId, year, sem){  //find by id, year, sem
    return this.find({studentId: userId, year: year, sem: sem});
}

courseStudentSchema.statics.findByUserIdCourseIdYearSem = function (userId, cId, year, sem){  //find by id, course, year, sem
    return this.findOne({studentId: userId, courseId: cId, year: year, sem: sem});
}


module.exports = mongoose.model("CourseStudent", courseStudentSchema);