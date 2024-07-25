const express = require('express');
const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
   userName :{
    required : true,
    type : String,  
    max:50,
    min:5,
    unique: true

   },
   email :{
    required : true,
    type : String,
    max :50,
    unique: true
   }
   ,
   password :{
    required : true,
    type : String,
    max :50
   },
   profilePicture :{
    type :String,
    default : ''
   }
   ,
   coverPicture:{
    type : String,
    default : ''
   },
   followers:{
    type:Array,
    default: []
   },
   following:{
    type:Array,
    default: []
   },
   isAdmin:{
    type:Boolean,
    default: false
   }
   
})

module.exports = mongoose.model('User', Schema);