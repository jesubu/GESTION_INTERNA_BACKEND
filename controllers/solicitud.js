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
    Solicitud.find({}).populate({path:'modulo sede estado importancia tipo'}).exec((err,solicitudes)=>{
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


module.exports={
    getSolicitud,
    getSolicitudes
}
