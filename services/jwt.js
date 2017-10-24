'use strict'

var jwt = require('jwt-simple');
var moment=require('moment');
var secret='1Q2w3e4r5t!';

exports.createToken=function(user){
    
    var payload={
        id:user._id,
        name:user.nombre,
        surname:user.apellidos,
        email:user.email,
        role:user.role,
        image:user.image,
        iat:moment().unix(),
        exp:moment().add(1,'days').unix()
    };
    
    var token= jwt.encode(payload,secret);
    return token;
};