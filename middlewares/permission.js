/*
// middleware for doing role-based permissions
export default function permit(allowed) {
    let isAllowed = role => _.indexOf(allowed, role) > -1;
    
    // return a middleware
    return (req, res, next) => {
      if (req.user && isAllowed(req.user.role))
        next(); // role is allowed, so continue on the next middleware
      else {
        response.status(403).json({message: "Forbidden"}); // user is forbidden
      }
    }
  }
  */

  'use strict'

  exports.isAdmin=function(req,res,next){
      if(req.user.role!='ROLE_ADMIN'){
          return res.status(200).send({message:'no tienes acceso'});
      }
      next();
  }