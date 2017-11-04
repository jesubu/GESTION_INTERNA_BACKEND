'use strict'

var express=require('express');

var multipart=require('connect-multiparty');
var md_upload=multipart({uploadDir:'./uploads/users'});

var ModuloController =require('../controllers/modulo');
var SedeController =require('../controllers/sede');
var TipoController =require('../controllers/tipo');
var ImportanciaController =require('../controllers/importancia');
var EstadoController =require('../controllers/estado');
var SolicitudController =require('../controllers/solicitud');

var md_auth=require('../middlewares/authenticated');
var permit =require ('../middlewares/permission');

var UserController =require('../controllers/user');

var api=express.Router();

//parametro opciona->:nombre?
api.get('/modulo/:id',ModuloController.getModulo);
api.get('/modulos',ModuloController.getModulos);
api.post('/modulo',ModuloController.saveModulo);
api.put('/modulo/:id',ModuloController.updateModulo);
api.delete('/modulo/:id',ModuloController.deleteModulo);

api.get('/sede/:id',SedeController.getSede);
api.get('/sedes',SedeController.getSedes);
api.post('/sede',SedeController.saveSede);
api.put('/sede/:id',SedeController.updateSede);
api.delete('/sede/:id',SedeController.deleteSede);

api.get('/tipo/:id',TipoController.getTipo);
api.get('/tipos',TipoController.getTipos);
api.post('/tipo',TipoController.saveTipo);
api.put('/tipo/:id',TipoController.updateTipo);
api.delete('/tipo/:id',TipoController.deleteTipo);

api.get('/importancia/:id',ImportanciaController.getImportancia);
api.get('/importancias',ImportanciaController.getImportancias);
api.post('/importancia',ImportanciaController.saveImportancia);
api.put('/importancia/:id',ImportanciaController.updateImportancia);
api.delete('/importancia/:id',ImportanciaController.deleteImportancia);

api.get('/estado/:id',EstadoController.getEstado);
api.get('/estados',EstadoController.getEstados);
api.post('/estado',EstadoController.saveEstado);
api.put('/estado/:id',EstadoController.updateEstado);
api.delete('/estado/:id',EstadoController.deleteEstado);

api.get('/solicitudes',SolicitudController.getSolicitudes);
api.get('/solicitudes/:id',SolicitudController.getSolicitud);
api.post('/solicitud',SolicitudController.saveSolicitud);
api.put('/solicitud/:id',SolicitudController.updateSolicitud);
api.delete('/solicitud/:id',SolicitudController.deleteSolicitud);

api.get('/pruebasSeguridad',[md_auth.ensureAuth,permit.isAdmin],UserController.pruebas);

api.get('/user/:id',UserController.getUser);
api.get('/users',UserController.getUsers);
api.post('/user',UserController.saveUser);
api.post('/upload-image-user/:id',[md_auth.ensureAuth,md_upload],UserController.uploadImage);
api.get('/get-image-file/:imageFile',UserController.getImageFile);
api.put('/user/:id',UserController.updateUser);
api.delete('/user/:id',UserController.deleteUser);
api.post('/login',UserController.login);

module.exports=api;