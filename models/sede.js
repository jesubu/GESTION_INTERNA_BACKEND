'use strict'

var mongoose=require('mongoose');

var Schema=mongoose.Schema;

var SedesSchema=Schema({
    nombre:String,
    idEmpresa:Number
    
});

module.exports=mongoose.model('Sede',SedesSchema);