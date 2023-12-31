const mongoose = require("mongoose");

const progSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String , unique: true},
  dept: { type: String },
  intro: { type: String },
  credit: [{  //how many credit this program need
		yearType: { type: String, enum: ["year1", "year2 entry", "year3 entry"] },
    credit: { type: Number }
  }], 
  leaders: { type:[{type:String}]},
  course: { type:[{type:String}]},
  yearFrom: { type:String }, //date(year) of create
  status: { type:String }
});

//------------------Function start------------------

progSchema.statics.findByProgId = function (progId){  //find by id
    return this.findOne({id: progId});
}

progSchema.statics.findByName = function (name){  //find by name
    return this.findOne({name: name});
}

progSchema.statics.findByDept = function (dept){  //find by dept
    return this.find({dept: dept});
}

progSchema.statics.findByLeaders = function (leader){  //find by leader
    return this.find({leaders: {$elemMatch:{$in: leader}}});
}

progSchema.statics.findByCourse= function (course){  //find by course
    return this.find({course: {$elemMatch:{$in: course}}});
}

progSchema.statics.findByYearFrom = function (year){  //find by date(year)
    return this.find({yearFrom: year});
}

progSchema.statics.findByStatus = function (status){  //find by status
    return this.find({status: status});
}

module.exports = mongoose.model("Program", progSchema);