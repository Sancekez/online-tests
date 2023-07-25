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
  Class: {
    type: String
  },
  questions: [{
    question: String,
    options: [String],
    correctAnswer: Number
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  accessCode: {
    type: Number
  },
  createdAt: {
    type: Date,
    "default": Date.now
  }
});
var QuizModel = mongoose.model('Quiz', QuizSchema);
module.exports.QuizModel = QuizModel;