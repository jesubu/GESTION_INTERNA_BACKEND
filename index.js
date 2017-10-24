'use strict'

var mongoose=require('mongoose');
var app=require('./app.js');
var port=process.env.PORT || 3678;
mongoose.Promise=global.Promise;

mongoose.connect('mongodb://localhost:27017/GI',(err,res)=>{
    if (err){
        console.log( err);
    }
    else{
        console.log('conexion a Mongo OK');
        app.listen(port,function(){
            console.log(`API REST FAVORITOS funcionando en ...  http://localhost:${port}`);
        });
    }

});

