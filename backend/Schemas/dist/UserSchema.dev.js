"use strict";

var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var UserSchema = new Schema({
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
var UserModel = mongoose.model('User', UserSchema);
module.exports.UserModel = UserModel;