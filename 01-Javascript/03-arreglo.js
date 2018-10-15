var arreglo = [];

arreglo = [
    1,
    "Jonathan",
    false,
    null,
    new Date(),
    {
        nombre : "Paul"
    },
    [1, 2, false, true]
];

console.log(arreglo);
arreglo.push(3); //agregar items al final del arreglo
console.log(arreglo);
arreglo.pop(); //elimina el ultimo item del arreglo
console.log(arreglo);

var arregloNumeros = [1,2,3,4,5];

arregloNumeros.splice(1,0,1.1); //agregar un elemente despues de algo (1)
                    //Inicio, # elementos a eliminar, elemento a agregar

console.log(arregloNumeros);

arregloNumeros.splice(4,1);  //Eliminar un elemento en un indice especifico
                     //Inicio, # elementos a eliminar

console.log(arregloNumeros);


var indiceDelNumeroDos = arregloNumeros.indexOf(2); //obtener el indice de un elemento

console.log(indiceDelNumeroDos)

arregloNumeros.splice(indiceDelNumeroDos,0,1.2,1.3,1.4,1.5,1.6,1.7,1.8,1.9); //agregar n elementos

console.log(arregloNumeros);

var indiceDelNumeroSiete = arregloNumeros.indexOf(1.7);

console.log(arregloNumeros[indiceDelNumeroSiete]); // imprimir un elemento buscado





var posicionInicialUnoUno = arregloNumeros.indexOf(1.1);
var posicionInicialUnoNueve = arregloNumeros.indexOf(1.9);
var desdeElUnoAlUnoNueve = ( posicionInicialUnoNueve - posicionInicialUnoUno)+1;


arregloNumeros.splice(
    posicionInicialUnoUno,
    desdeElUnoAlUnoNueve
    );


console.log(arregloNumeros);









var arregloUno = [1,2,3];
var arreglodos = [4,5,6];

//DEstructuracion de arreglos
console.log(...arregloUno)

var arregloCompleto = [...arregloUno, ...arreglodos]; //Concatenar arreglos

console.log(arregloCompleto);


//DESTRUCTURACION DE OBJETOS
var jonathan = {
    nombre: "Jonathan",
    apellido: "Caiza",
    direccion: "Guamani",
    casado: false,
    edad: 23
};

var paul = {
    mascota:{
        nombre: "Cachetes"
    },
    fechaNacimeinto: new Date('1995-29-03')
};

var datosDeUsuario ={  //sirve apra unir dos objetos
    ...jonathan,
    ...paul
};


console.log (datosDeUsuario);






//OBJETOS

var atributosDelOnjeto = Object.keys(datosDeUsuario);

console.log(atributosDelOnjeto);

datosDeUsuario['nombre'];
console.log(datosDeUsuario['nombre'])
console.log(datosDeUsuario[atributosDelOnjeto[0]]);






