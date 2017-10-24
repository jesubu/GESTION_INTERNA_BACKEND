'use strict'

var express=require('express');
var ModuloController =require('../controllers/modulo');

var apiModulo=express.Router();

//parametro opciona->:nombre?
apiModulo.get('/modulo/:id',ModuloController.getModulo);
apiModulo.get('/modulos',ModuloController.getModulos);
apiModulo.post('/modulo',ModuloController.saveModulo);
apiModulo.put('/modulo/:id',ModuloController.updateModulo);
apiModulo.delete('/modulo/:id',ModuloController.deleteModulo);

module.exports=apiModulo;