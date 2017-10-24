'use strict'

var mongoose=require('mongoose');

var Schema=mongoose.Schema;

var TiposSchema=Schema({
    tipo:String,
    
});

module.exports=mongoose.model('Tipo',TiposSchema);