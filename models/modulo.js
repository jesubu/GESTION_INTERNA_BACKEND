'use strict'

var mongoose=require('mongoose');

var Schema=mongoose.Schema;

var ModulosSchema=Schema({
    nombre:String,
    descripcion:String,
    activo:Boolean
    
});

module.exports=mongoose.model('Modulo',ModulosSchema);
