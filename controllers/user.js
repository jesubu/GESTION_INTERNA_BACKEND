'use strict'

var User=require('../models/user');
var bcrypt=require('bcrypt-nodejs');
var fs=require('fs');
var path=require('path');

var jwt=require('../services/jwt.js');

function getUser(req,res){
    var oId=req.params.id;
	
    User.findById(oId,function(err,user){
        if(err){
            res.status(500).send({message:'Error al devolver el marcador'});
        }else{
            if (!user){
                res.status(404).send({message:'No existe el marcador'});
            }
            else{
                res.status(200).send({status:200,user:user});
            }           
        }
    });
}

function uploadImage(req,res){
    //debugger;
    console.log('asdf');
    var userId=req.params.id;
    var file_name='No subido...';
    console.log(req.files);
    if(req.files){
        var file_path=req.files.uploads[0].path;
        //console.log('--------------------------------------');
       // console.log(file_path);
        var file_split=file_path.split('\\');
        var file_name=file_split[2];
        var ext_split=file_name.split('\.');
        var file_ext=ext_split[1];
        //console.log(file_path + '   ##   '+ file_name + '   ##   '+file_ext);

        if (file_ext=='png' || file_ext=='jpg'||file_ext=='jpeg'){
            var params=req.body;
            var oId=req.params.id;
            console.log('Actualizando Imagen usuario: ' + oId);
            User.findByIdAndUpdate(oId,{image:file_name},(err,userUpdated)=>{
                if(err){
                    res.status(500).send({message:'Error al actualizar el marcador'});
                }
                else{
                    res.status(200).send({update:true, user:userUpdated,image:file_name});
                }              
            });
        }else{
            fs.unlink(file_path,(err)=>{
                if(err){
                    res.status(200).send({message:'Extensión no válida y fichero no borrado.'});
                }
                else{
                    res.status(200).send({message:'Extensión no válida'});
                }
            });         
        }
        /*
        res.status(200).send({
            file_path=file_path,
            file_split=file_split,
            file_name=file_name
        });
        */
    }
    else{
        res.status(200).send({message:'No se han subido archivos'});
    }
}

function getImageFile(req,res){
    console.log('get image');
    var imageFile=req.params.imageFile;
    var path_file='./uploads/users/'+imageFile;
    fs.exists(path_file,function(exists){
        if (exists){
            res.sendFile(path.resolve(path_file));

        }else{
            res.status(200).send({message:'La imagen no existe'}); 
        }
    });


}

function getUsers(req,res){
    //orden descendente -columna.
    User.find({}).sort('nombre').exec((err,users)=>{
        if (err){
            res.status(500).send({message:'Error al devolver los marcadores'});
        }
        else{
                if(!users){
                    res.status(404).send({message:'No hay marcadores'});

                }else{
                    res.status(200).send({users});
                }
            }
    });    
}

function saveUser(req,res){
    var user=new User();
    var params=req.body;
    console.log(params.password + '  '+  params.nombre  + '  '+ params.email);
    if (params.password && params.nombre && params.email){
        
        user.nombre=params.nombre;
        user.apellidos=params.apellidos;
        user.email=params.email;
        
        user.role='ROLE_USER';

        User.findOne({email:user.email.toLowerCase()}, (err,user)=>{
            if(err){
                res.status(500).send({message:'Error al comprobar que el usuario existe.'});
            }
            else{
                if(!user){
                    //ciframos la contraseña
                    bcrypt.hash(params.password,null,null,function(err,hash){
                        user.password=hash;
                        //guardamos
                        user.save((err,userStored)=>{
                            if(err){
                                console.log(err);
                                res.status(500).send({message:'Error al guardar el marcador'});
                            }
                            else{
                                res.status(200).send({user:userStored});
                            }
                    
                        });
                    });
                }else{
                    res.status(500).send({message:'Error usuario existente.'});
                }
            }
        });

    }
    else{
        res.status(200).send({message:'faltan datos'});
    }



    console.log(user);
    
}

function updateUser(req,res){
     var params=req.body;
    var oId=req.params.id;
     console.log('Actualizando: ' + oId);
    var update=req.body;
    var user=new User();
    user.user=params.user;

    User.findByIdAndUpdate(oId,update,(err,userUpdated)=>{
        if(err){
            res.status(500).send({message:'Error al actualizar el marcador'});
        }
        else{
            res.status(200).send({update:true, user:userUpdated});
        }
        
    });

    
}

function deleteUser(req,res){
    var oId=req.params.id;
	var user=new User();
	console.log(oId);
    User.findById(oId,function(err,user){
        if(err){
            res.status(500).send({message:'Error al devolver el marcador'});
        }else{
			if (!user){
				res.status(404).send({message:'No existe el marcador3333'});
			}else{
				user.remove(err=>{
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

function login(req,res){
    var params=req.body;
    //console.log(req.body);
    //console.log(params.gettoken);
    var email=params.email;
    var password=params.password;
    console.log('gettoken: '+params.gettoken);
    //console.log(email + '  ' + password);
    User.findOne({email:email.toLowerCase()}, (err,user)=>{
        if(err){
            res.status(500).send({message:'Error al comprobar que el usuario existe.'});
        }
        else{
            if(user){
                bcrypt.compare(password,user.password,(err,check)=>{
                    if (check){
                        //console.log(check + ' ' +params.gettoken);
                        //comprobamos el token y/o generamos
                        console.log('asdfasdfasdf el token');
                        if(params.gettoken){
                            //retornamos el token
                            console.log('retornamos el token');
                            res.status(200).send({
                                token:jwt.createToken(user)
                            });

                        }else{
                            console.log('retornamos el usuario');
                            res.status(200).send({user});
                        }
                        //res.status(200).send({issetUser});
                    }
                    else{
                        console.log('la contraseña no es correcta ' + user);
                        res.status(404).send({message:'la contraseña no es correcta.'});  
                    }
                });
                

            }else{
                res.status(404).send({message:'El usuario no existe.'});
            }
        }
    });

/*
    res.status(200).send({
        message:'login'
    });
*/
}

function pruebas(req,res){
    res.status(200).send({
        message:'login'
    });
}

module.exports={
    getUser,
    uploadImage,
    getImageFile,
    getUsers,
    saveUser,
    updateUser,
    deleteUser,
    login,
    pruebas
}