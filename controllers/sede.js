'use strict'

var Sede=require('../models/sede');

function getSede(req,res){
    var oId=req.params.id;
	
    Sede.findById(oId,function(err,sede){
        if(err){
            res.status(500).send({message:'Error al devolver el marcador'});
        }else{
            if (!sede){
                res.status(404).send({message:'No existe el marcador'});
            }
            else{
                res.status(200).send({status:200,sede:sede});
            }           
        }
    });
}

function getSedes(req,res){
    //orden descendente -columna.
    Sede.find({}).sort('nombre').exec((err,sedes)=>{
        if (err){
            res.status(500).send({message:'Error al devolver los marcadores'});
        }
        else{
                if(!sedes){
                    res.status(404).send({message:'No hay marcadores'});

                }else{
                    res.status(200).send({sedes});
                }
            }
    });    
}

function saveSede(req,res){
    
    var sede=new Sede();
    
    var params=req.body;

    sede.nombre=params.nombre;
    sede.idEmpresa=params.idEmpresa;
    console.log(sede);
    sede.save((err,sedeStored)=>{
        if(err){
            console.log(err);
            res.status(500).send({message:'Error al guardar el marcador'});
        }
        else{
            res.status(200).send({sede:sedeStored});
        }

    });    
}

function updateSede(req,res){
     var params=req.body;
    var oId=req.params.id;
     console.log('Actualizando: ' + oId);
    var update=req.body;
    var sede=new Sede();
    sede.nombre=params.nombre;
    sede.idEmpresa=params.idEmpresa;

    Sede.findByIdAndUpdate(oId,update,(err,sedeUpdated)=>{
        if(err){
            res.status(500).send({message:'Error al actualizar el marcador'});
        }
        else{
            res.status(200).send({update:true, sede:sedeUpdated});
        }
        
    });

    
}

function deleteSede(req,res){
    var oId=req.params.id;
	var sede=new Sede();
	console.log(oId);
    Sede.findById(oId,function(err,sede){
        if(err){
            res.status(500).send({message:'Error al devolver el marcador'});
        }else{
			if (!sede){
				res.status(404).send({message:'No existe el marcador3333'});
			}else{
				sede.remove(err=>{
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
    getSede,
    getSedes,
    saveSede,
    updateSede,
    deleteSede
}