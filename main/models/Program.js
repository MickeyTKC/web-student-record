const mongoose = require("mongoose");

const progSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String , unique: true},
  dept: { type: String },
  intro: { type: String },
  credit: { type: Number },
  leaders: { type:[{type:String}]},
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
    return this.find({leaders: leader});
}

progSchema.statics.findByYearFrom = function (year){  //find by date(year)
    return this.find({yearFrom: year});
}

progSchema.statics.findByStatus = function (status){  //find by status
    return this.find({status: status});
}

module.exports = mongoose.model("Program", progSchema);