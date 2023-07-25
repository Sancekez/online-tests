"use strict";

var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var TeacherSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  surName: {
    type: String
  }
});
var TeacherModel = mongoose.model('Teacher', TeacherSchema);
module.exports.TeacherModel = TeacherModel;