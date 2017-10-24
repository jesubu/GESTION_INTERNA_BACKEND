'use strict'

var mongoose=require('mongoose');

var Schema=mongoose.Schema;

var UsersSchema=Schema({
    nombre:String,
    apellidos:String,
    email:String,
    password:String,
    role:String,
    image:String
    
});

module.exports=mongoose.model('User',UsersSchema);