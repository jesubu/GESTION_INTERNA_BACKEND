'use strict'

var mongoose=require('mongoose');

var Schema=mongoose.Schema;

var SolicitudesSchema=Schema({
    titulo:String,
    descripcion:String,
    fechaSolicitud:{ type: Date, default: Date.now },
    modulo:{type:Schema.ObjectId,ref:'Modulo'},
    sede:{type:Schema.ObjectId,ref:'Sede'},
    estado:{type:Schema.ObjectId,ref:'Estado'},
    importancia:{type:Schema.ObjectId,ref:'Importancia'},
    tipo:{type:Schema.ObjectId,ref:'Tipo'}
});

module.exports=mongoose.model('Solicitudes',SolicitudesSchema);