'use strict'

var Tipo=require('../models/tipo');

function getTipo(req,res){
    var oId=req.params.id;
	
    Tipo.findById(oId,function(err,tipo){
        if(err){
            res.status(500).send({message:'Error al devolver el marcador'});
        }else{
            if (!tipo){
                res.status(404).send({message:'No existe el marcador'});
            }
            else{
                res.status(200).send({status:200,tipo:tipo});
            }           
        }
    });
}

function getTipos(req,res){
    //orden descendente -columna.
    Tipo.find({}).sort('tipo').exec((err,tipos)=>{
        if (err){
            res.status(500).send({message:'Error al devolver los marcadores'});
        }
        else{
                if(!tipos){
                    res.status(404).send({message:'No hay marcadores'});

                }else{
                    res.status(200).send({tipos});
                }
            }
    });    
}

function saveTipo(req,res){
    var tipo=new Tipo();
    
    var params=req.body;
    tipo.tipo=params.tipo;

    console.log(tipo);
    tipo.save((err,tipoStored)=>{
        if(err){
            console.log(err);
            res.status(500).send({message:'Error al guardar el marcador'});
        }
        else{
            res.status(200).send({tipo:tipoStored});
        }

    });    
}

function updateTipo(req,res){
     var params=req.body;
    var oId=req.params.id;
     console.log('Actualizando: ' + oId);
    var update=req.body;
    var tipo=new Tipo();
    tipo.tipo=params.tipo;

    Tipo.findByIdAndUpdate(oId,update,(err,tipoUpdated)=>{
        if(err){
            res.status(500).send({message:'Error al actualizar el marcador'});
        }
        else{
            res.status(200).send({update:true, tipo:tipoUpdated});
        }
        
    });

    
}

function deleteTipo(req,res){
    var oId=req.params.id;
	var tipo=new Tipo();
	console.log(oId);
    Tipo.findById(oId,function(err,tipo){
        if(err){
            res.status(500).send({message:'Error al devolver el marcador'});
        }else{
			if (!tipo){
				res.status(404).send({message:'No existe el marcador3333'});
			}else{
				tipo.remove(err=>{
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
    getTipo,
    getTipos,
    saveTipo,
    updateTipo,
    deleteTipo
}