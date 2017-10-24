'use strict'

var Modulo=require('../models/modulo');

function getModulo(req,res){
    var oId=req.params.id;
	
    Modulo.findById(oId,function(err,modulo){
        if(err){
            res.status(500).send({message:'Error al devolver el marcador'});
        }else{
            if (!modulo){
                res.status(404).send({message:'No existe el marcador'});
            }
            else{
                res.status(200).send({status:200,modulo:modulo});
            }           
        }
    });
}

function getModulos(req,res){
    //orden descendente -columna.
    Modulo.find({}).sort('nombre').exec((err,modulos)=>{
        if (err){
            res.status(500).send({message:'Error al devolver los marcadores'});
        }
        else{
                if(!modulos){
                    res.status(404).send({message:'No hay marcadores'});

                }else{
                    res.status(200).send({modulos});
                }
            }
    });    
}

function saveModulo(req,res){
    
    var modulo=new Modulo();
    
    var params=req.body;

    modulo.nombre=params.nombre;
    modulo.descripcion=params.descripcion;
    modulo.activo=params.activo;
    console.log(modulo);
    modulo.save((err,moduloStored)=>{
        if(err){
            console.log(err);
            res.status(500).send({message:'Error al guardar el marcador'});
        }
        else{
            res.status(200).send({modulo:moduloStored});
        }

    });    
}

function updateModulo(req,res){
     var params=req.body;
    var oId=req.params.id;
     console.log('Actualizando: ' + oId);
    var update=req.body;
    var modulo=new Modulo();
    modulo.nombre=params.nombre;
    modulo.descripcion=params.descripcion;
    modulo.activo=params.activo;

    Modulo.findByIdAndUpdate(oId,update,(err,moduloUpdated)=>{
        if(err){
            res.status(500).send({message:'Error al actualizar el marcador'});
        }
        else{
            res.status(200).send({update:true, modulo:moduloUpdated});
        }
        
    });

    
}

function deleteModulo(req,res){
    var oId=req.params.id;
	var modulo=new Modulo();
	console.log(oId);
    Modulo.findById(oId,function(err,modulo){
        if(err){
            res.status(500).send({message:'Error al devolver el marcador'});
        }else{
			if (!modulo){
				res.status(404).send({message:'No existe el marcador3333'});
			}else{
				modulo.remove(err=>{
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
    getModulo,
    getModulos,
    saveModulo,
    updateModulo,
    deleteModulo
}