"use strict";var mongoose=require("mongoose"),Schema=mongoose.Schema,StudentSchema=new Schema({email:{type:String,required:!0,unique:!0},password:{type:String,required:!0},name:{type:String,required:!0},surName:{type:String}}),StudentModel=mongoose.model("Student",StudentSchema);module.exports.StudentModel=StudentModel;