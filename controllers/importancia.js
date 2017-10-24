'use strict'

var Importancia=require('../models/importancia');

function getImportancia(req,res){
    var oId=req.params.id;
	
    Importancia.findById(oId,function(err,importancia){
        if(err){
            res.status(500).send({message:'Error al devolver el marcador'});
        }else{
            if (!importancia){
                res.status(404).send({message:'No existe el marcador'});
            }
            else{
                res.status(200).send({status:200,importancia:importancia});
            }           
        }
    });
}

function getImportancias(req,res){
    //orden descendente -columna.
    Importancia.find({}).sort('nombre').exec((err,importancias)=>{
        if (err){
            res.status(500).send({message:'Error al devolver los marcadores'});
        }
        else{
                if(!importancias){
                    res.status(404).send({message:'No hay marcadores'});

                }else{
                    res.status(200).send({importancias});
                }
            }
    });    
}

function saveImportancia(req,res){
    
    var importancia=new Importancia();
    
    var params=req.body;

    importancia.nombre=params.nombre;
    importancia.color=params.color;
    console.log(importancia);
    importancia.save((err,importanciaStored)=>{
        if(err){
            console.log(err);
            res.status(500).send({message:'Error al guardar el marcador'});
        }
        else{
            res.status(200).send({importancia:importanciaStored});
        }

    });    
}

function updateImportancia(req,res){
     var params=req.body;
    var oId=req.params.id;
     console.log('Actualizando: ' + oId);
    var update=req.body;
    var importancia=new Importancia();
    importancia.nombre=params.nombre;
    importancia.color=params.color;

    Importancia.findByIdAndUpdate(oId,update,(err,importanciaUpdated)=>{
        if(err){
            res.status(500).send({message:'Error al actualizar el marcador'});
        }
        else{
            res.status(200).send({update:true, importancia:importanciaUpdated});
        }
        
    });

    
}

function deleteImportancia(req,res){
    var oId=req.params.id;
	var importancia=new Importancia();
	console.log(oId);
    Importancia.findById(oId,function(err,importancia){
        if(err){
            res.status(500).send({message:'Error al devolver el marcador'});
        }else{
			if (!importancia){
				res.status(404).send({message:'No existe el marcador3333'});
			}else{
				importancia.remove(err=>{
					if(err){
						res.status(500).send({message:'El marcado no se ha eliminado'});
					}else{
						res.status(200).send({status:200,message:'El marcado se ha eliminado'});
					}
				});
			}
		}
       
    });
}

module.exports={
    getImportancia,
    getImportancias,
    saveImportancia,
    updateImportancia,
    deleteImportancia
}