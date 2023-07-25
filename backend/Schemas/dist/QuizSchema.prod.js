"use strict";var mongoose=require("mongoose"),Schema=mongoose.Schema,QuizSchema=new Schema({title:{type:String,required:!0},subtitle:{type:String},Class:{type:String},questions:[{question:String,options:[String],correctAnswer:Number}],createdBy:{type:mongoose.Schema.Types.ObjectId,ref:"User"},accessCode:{type:Number},createdAt:{type:Date,default:Date.now}}),QuizModel=mongoose.model("Quiz",QuizSchema);module.exports.QuizModel=QuizModel;