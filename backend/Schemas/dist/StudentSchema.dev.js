"use strict";

var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var StudentSchema = new Schema({
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
var StudentModel = mongoose.model('Student', StudentSchema);
module.exports.StudentModel = StudentModel;