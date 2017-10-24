'use strict'

var mongoose=require('mongoose');

var Schema=mongoose.Schema;

var ImportanciasSchema=Schema({
    nombre:String,
    color:String
    
});

module.exports=mongoose.model('Importancia',ImportanciasSchema);