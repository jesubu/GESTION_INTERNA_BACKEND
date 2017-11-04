'use strict'

var Solicitud=require('../models/solicitud');

function getSolicitud(req,res){
    var oId=req.params.id;
	console.log(oId);
    Solicitud.findById(oId,function(err,solicitud){
        if(err){
            res.status(500).send({message:'Error al devolver el marcador'});
        }else{
            if (!solicitud){
                res.status(404).send({message:'No existe el marcador'});
            }
            else{
                res.status(200).send({status:200,solicitud:solicitud});
            }           
        }
    });
}

function getSolicitudes(req,res){
    //orden descendente -columna.
    /*
    sede:{type:Schema.ObjectId,ref:'Sede'},
    estado:{type:Schema.ObjectId,ref:'Estado'},
    importancia:{type:Schema.ObjectId,ref:'Importancia'},
    tipo:{type:Schema.ObjectId,ref:'Tipo'}
*/
//ordernamos descendentemente por fecha
    Solicitud.find({}).sort({fechaSolicitud: -1}).populate({path:'modulo sede estado importancia tipo'}).exec((err,solicitudes)=>{
        if (err){
            res.status(500).send({message:'Error al devolver los marcadores'});
        }
        else{
                if(!solicitudes){
                    res.status(404).send({message:'No hay marcadores'});

                }else{
                    res.status(200).send({solicitudes});
                }
                
            }
    });    
}

function saveSolicitud(req,res){
    
    var solicitud=new Solicitud();
    
    var params=req.body;

    solicitud.titulo=params.titulo;
    solicitud.descripcion=params.descripcion;
    solicitud.fechaSolicitud=params.fechaSolicitud;
    solicitud.modulo=params.modulo;
    solicitud.sede=params.sede;
    solicitud.estado=params.estado;
    solicitud.importancia=params.importancia;
    solicitud.tipo=params.tipo;
    solicitud.fechaResolucion=params.fechaResolucion;
    solicitud.procede=params.procede;
    solicitud.tiempoDedicado=params.tiempoDedicado;
    solicitud.resolucion=params.resolucion;

    console.log(solicitud);
    solicitud.save((err,solicitudStored)=>{
        if(err){
            console.log(err);
            res.status(500).send({message:'Error al guardar el marcador'});
        }
        else{
            res.status(200).send({solicitud:solicitudStored});
        }

    });    
}

function updateSolicitud(req,res){
     var params=req.body;
    var oId=req.params.id;
     console.log('Actualizando: ' + oId);
    var update=req.body;
    var solicitud=new Solicitud();
    solicitud.titulo=params.titulo;
    solicitud.descripcion=params.descripcion;
    solicitud.fechaSolicitud=params.fechaSolicitud;
    solicitud.modulo=params.modulo;
    solicitud.sede=params.sede;
    solicitud.estado=params.estado;
    solicitud.importancia=params.importancia;
    solicitud.tipo=params.tipo;
    solicitud.fechaResolucion=params.fechaResolucion;
    solicitud.procede=params.procede;
    solicitud.tiempoDedicado=params.tiempoDedicado;
    solicitud.resolucion=params.resolucion;

    Solicitud.findByIdAndUpdate(oId,update,(err,solicitudUpdated)=>{
        if(err){
            res.status(500).send({message:'Error al actualizar el marcador'});
        }
        else{
            res.status(200).send({update:true, solicitud:solicitudUpdated});
        }
        
    });

    
}

function deleteSolicitud(req,res){
    var oId=req.params.id;
	var solicitud=new Solicitud();
	console.log(oId);
    Solicitud.findById(oId,function(err,solicitud){
        if(err){
            res.status(500).send({message:'Error al devolver el marcador'});
        }else{
			if (!solicitud){
				res.status(404).send({message:'No existe el marcador'});
			}else{
				solicitud.remove(err=>{
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
    getSolicitud,
    getSolicitudes,
    saveSolicitud,
    updateSolicitud,
    deleteSolicitud
}
