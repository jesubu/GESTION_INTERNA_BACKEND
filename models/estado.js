'use strict'

var mongoose=require('mongoose');

var Schema=mongoose.Schema;

var EstadosSchema=Schema({
    nombre:String,
    color:String
    
});

module.exports=mongoose.model('Estado',EstadosSchema);