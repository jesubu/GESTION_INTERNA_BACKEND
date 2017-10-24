'use strict'

var express=require('express'); //similar a un import
var bodyParser=require('body-parser');

var app=express();
var api=require('./routes/bgi_routes');


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods','GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow','GET, POST, OPTIONS, PUT, DELETE');
    next();
});



app.use('/api',api);


/*
//parametro opciona->:nombre?
app.get('/prueba/:nombre',function(req,res){
    var nom=req.params.nombre;
    res.status(200).send({
        data:[1,2,3,4],
        texto:"Hola Mundo con NodeJS y EXPRESS " +nom
    });
});
*/

module.exports=app;
