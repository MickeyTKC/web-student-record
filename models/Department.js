const mongoose = require("mongoose");

const deptSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String },
  intro: { type: String },
  program: { type:[{type:String}]},
  heads: { type:[{type:String}]},
  teachers: { type:[{type:String}]},
  status: { type:String }
});

//------------------Function start------------------

deptSchema.statics.findByDeptId = function (dId){  //find by dept id
    return this.findOne({id: dId});
}

deptSchema.statics.findByName = function (name){  //find by name
    return this.findOne({name: name});
}

deptSchema.statics.findByProgram = function (prog){  //find by program
    return this.find({program: {$elemMatch:{$in: prog}}});
}

deptSchema.statics.findByHeads = function (head){  //find by heads
    return this.findOne({heads: {$elemMatch:{$in: head}}});
}

deptSchema.statics.findByTeachers = function (teacher){  //find by teachers
    return this.find({teachers: {$elemMatch:{$in: teacher}}});
}

deptSchema.statics.findByStatus = function (status){  //find by status
    return this.find({status: status});
}

module.exports = mongoose.model("Department", deptSchema);