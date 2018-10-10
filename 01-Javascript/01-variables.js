//Tipados Int edad = 1

var edad = 1; //
var sueldo = 1.01;
var nombre = "Jonathan";
var nombre = 'Jonathan';
var nombre = `Jonathan`;
var casado = false;
var hijos = null;
var cuatroBrazos;
var fecha = new Date();

//console.log("Hola mundo");

console.log(typeof edad);
console.log(typeof sueldo);
console.log(typeof nombre);
console.log(typeof casado);
console.log(typeof hijos);
console.log('cuatrobrazos', cuatroBrazos); //undefined
console.log(typeof cuatroBrazos); //undefined
console.log('fecha', fecha); //
console.log(typeof fecha); //

var jonathanJSON = {
    "nombre":"Jonathan",
        "edad":23,
        "sueldo": 10.1,
        "casado":false,
        "hijos":null,
        "mascota":{
        "nombre":"Cachetes"
        }
}//object


var jonathan = {
    'nombre':'JOnathan'
    edad:23,
    sueldo: 10.1,
    casado:false,
    hijos:null,
    mascota:{
        "nombre":"Cachetes"
    }, //es buena oractica es poner coma
}; //Object

console.log(jonathan.nombre); //Jonathan


//===================IF ELSE======================


if(false){
    console.log("Si");
}else{
    console.log("No");
}

//truthy (strings, 1, -1, numbers, object)
//false  (0, null, undefined)

if(""){
    console.log("Si");
}else{
    console.log("No");
}

if(null){
    console.log("Si");
}else{
    console.log("No");
}


if(new Date()){
    console.log("Si");
}else{
    console.log("No");
}

if(undefined){
    console.log("Si");
}else{
    console.log("No");
}






