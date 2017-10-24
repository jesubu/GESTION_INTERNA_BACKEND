'use strict'

var Estado=require('../models/estado');

function getEstado(req,res){
    var oId=req.params.id;
	
    Estado.findById(oId,function(err,estado){
        if(err){
            res.status(500).send({message:'Error al devolver el marcador'});
        }else{
            if (!estado){
                res.status(404).send({message:'No existe el marcador'});
            }
            else{
                res.status(200).send({status:200,estado:estado});
            }           
        }
    });
}

function getEstados(req,res){
    //orden descendente -columna.
    Estado.find({}).sort('nombre').exec((err,estados)=>{
        if (err){
            res.status(500).send({message:'Error al devolver los marcadores'});
        }
        else{
                if(!estados){
                    res.status(404).send({message:'No hay marcadores'});

                }else{
                    res.status(200).send({estados});
                }
            }
    });    
}

function saveEstado(req,res){
    
    var estado=new Estado();
    
    var params=req.body;

    estado.nombre=params.nombre;
    estado.color=params.color;

    console.log(estado);
    estado.save((err,estadoStored)=>{
        if(err){
            console.log(err);
            res.status(500).send({message:'Error al guardar el marcador'});
        }
        else{
            res.status(200).send({estado:estadoStored});
        }

    });    
}

function updateEstado(req,res){
     var params=req.body;
    var oId=req.params.id;
     console.log('Actualizando: ' + oId);
    var update=req.body;
    var estado=new Estado();
    estado.nombre=params.nombre;
    estado.color=params.color;
    
    Estado.findByIdAndUpdate(oId,update,(err,estadoUpdated)=>{
        if(err){
            res.status(500).send({message:'Error al actualizar el marcador'});
        }
        else{
            res.status(200).send({update:true, estado:estadoUpdated});
        }
        
    });

    
}

function deleteEstado(req,res){
    var oId=req.params.id;
	var estado=new Estado();
	console.log(oId);
    Estado.findById(oId,function(err,estado){
        if(err){
            res.status(500).send({message:'Error al devolver el marcador'});
        }else{
			if (!estado){
				res.status(404).send({message:'No existe el marcador3333'});
			}else{
				estado.remove(err=>{
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
    getEstado,
    getEstados,
    saveEstado,
    updateEstado,
    deleteEstado
}