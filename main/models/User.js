const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["student", "teacher", "admin"], required: true },
  name: { type: String },
  department: { type: String },
  major: { type: String },  //if teacher just ""
  dateFrom: { type: String }, //date of join HKMU
  dateTo: { type: String }, //date of expected graduate, if teacher just ""
  email: { type: String }, 
  phoneNo: { type: String },
  emergencyPhoneNo: { type: String }
});

//------------------Function start------------------

userSchema.statics.findByUserId = function (userId){  //find by id
    return this.findOne({id: userId});
}

userSchema.statics.findByRole = function (role){  //find by role
    return this.find({role: role});
}

userSchema.statics.findByName = function (name){  //find by name
    return this.find({name: name});
}

userSchema.statics.findByDept = function (dept){  //find by department
    return this.find({department: dept});
}

userSchema.statics.findByMajor = function (major){  //find by major
    return this.find({major: major});
}

userSchema.statics.findBydateFrom = function (date){  //find by date start
    return this.find({dateFrom: date});
}

userSchema.statics.findBydateTo = function (date){  //find by date expected graduate
    return this.find({dateTo: date});
}

userSchema.statics.findByEmail = function (email){  //find by email
    return this.find({email: email});
}

module.exports = mongoose.model("User", userSchema);