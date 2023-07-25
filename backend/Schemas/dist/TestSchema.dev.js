"use strict";

var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var QuizSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String
  },
  "class": {
    type: String
  },
  quiz: {
    type: Array,
    required: true
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
var UserModel = mongoose.model('User', UserSchema);
module.exports.UserModel = UserModel;