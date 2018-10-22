function ejemplo () {

} //las funciones no deben terminar con ;

var ejemploDos = function () { //Anonymous funtion

};


var adrian = {
    trabajar: function () { //Anonymous funtion
        return 'Trabajando';
    }
}


var arregloFinciones = [function () { //Anonymous funtion

}]

console.log(typeof ejemplo); // Tipo de dato -> Function
console.log(ejemplo); // Definicion de la funcion
console.log(ejemplo()); // Ejecucion Funcion

var variableUno; // Nunca Usar VAR
let variableDos = 2 ; // USAR MUTABLE (este se asigna a otro valor)
//Ejm
variableDos = variableDos + 1;
const pi = 3.1416; //Intentemos usar const siempre y cuando no se pueda usar el let




//Operadores
const arregloDeNombres = ['A', 'b', 'C'];
arregloDeNombres[1] = 'B';
arregloDeNombres.push('D');

//arregloDeNombres = {};
//arregloDeNombres = [];


const paul = {
    nombre: 'Paul'
};

delete paul.nombre;

paul.nombre = 'Jonathan';
paul.edad = 24;

const casado = true;
//casado = false;

//cosnt apellido = '';
//apellido = '123'; Cambiar String


const edad = 29;
//edad = 30; Cmabiar Number

const variableNull = null;
//variableNull = 1; // No se peude reacignar


/// ---------------> CON CONST no se puede cambiar el tipo de dato
// si es strin morira string --- string por siempre




arregloDeNombres.forEach(          // Escribir codigo que se entienda
  function (valorActual, indiceActual, arreglo ) {
      console.log('Valor Actual',valorActual);
      console.log('Indice Actual',indiceActual);
      console.log('Arreglo',arreglo);
  }
);


//Function con nombre
//Function anonimas
//Fat arrow function ->  =>

arregloDeNombres.forEach(
    (valorActual, indiceActual, arreglo ) => { //Funciones de flecha gorda
        console.log('Valor Actual',valorActual);
        console.log('Indice Actual',indiceActual);
        console.log('Arreglo',arreglo);
    }
);


const sumarDosNumeros = (numUno, numDos) => {
    return numUno+numDos;
};

//se peude usar esta forma apra hacer lo mismo q lo anterior
const sumarDosNumeros2 = (numUno, numDos) => numUno+numDos;

//Cundo se tenga solo un valor para hacer el calculo no es necesario usar el ()
const elevarAlCuadrado = numero => numero*numero;
const elevarAlCuadrado2 = (numero) => numero*numero;


const arreglosNombresDos = ['E', 'F', 'G', 'H'];

const resultado = arregloDeNombres
    .map(//Mutar cada elemento del arreglo
        valorActual =>{  //(valorActual) =>{
            return valorActual+'.';
        }
    )// Devolver un arreglo
    .forEach(
        (valorNuevo) => console.log(valorNuevo)
    ); //undefined

console.log(resultado);


const arregloNumeros = [2, 3, 1, 5, 6, 4, 7, 8, 9, 10];


const resultadoFilter = arregloNumeros.filter( valorActual => valorActual >3 )
        /*{
            return valorActual<3; //
        }*/
    //);

const resultadofilter1 = arregloNumeros .filter(n=>(n%2)==0);

console.log(resultadofilter1);

if ('1' === 1){//falso
    console.log('Es verdad');
}else{
    console.log('Es false');
}


//every
const resultadoEvery = arregloNumeros
    .every(valorActual => valorActual>0); // Si cumple todos devuelve true sino cumple devuelve false

console.log(resultadoEvery);


//some
const resultadoSome = arregloNumeros
    .some(valorActual => valorActual <2); //SI uno cumple con la condicion nos devuelve true sino  false

console.log(resultadoSome);


const resultadoFindIndex = arregloNumeros
    .findIndex(valorActual => valorActual === 7);


//similar a: arregloNumeros.indexOf(7);

console.log(resultadoFindIndex);
console.log(arregloNumeros.indexOf(7));


const resultadoFind = arregloNumeros
    .find(n => n === 7);

console.log(resultadoFind);


//Reduce

const resultadoReduce = arregloNumeros
    .reduce(  //Acepta dos parametros
        (valorActualDelNumero, valorActualDelArreglo) => {  //Primer parametro una funcion
            return valorActualDelNumero + valorActualDelArreglo;
        },
        100        // Como segundo parametro acepta un valor
    );

console.log(resultadoReduce);

//Comienza desde el inico al final
const resultadoReduceV2 = arregloNumeros.reduce((a, b) => a + b.sueldo,0);


//Comienza desde el final al inicio
const resultadoReduceV3 = arregloNumeros.reduceRight((a, b) => a + b.sueldo,0);

//Sumar los 5 primero
const resultadoReduceV4 = arregloNumeros.reduceRight((a, b, indice) => {
   if(indice > 4){
       return a + b;
   }else{
       return a;
   }
},0);

console.log(resultadoReduceV4);


const conArregloNumeros = JSON.parse(JSON.stringify(arregloNumeros)); //Sirve para clonar cualquier ojeto y varible

const resultadoSort = arregloNumeros.sort((a, b) => a - b);
const resultadoSortV2 = conArregloNumeros.sort((a, b)=> b - a);


console.log(resultadoSort);
console.log(resultadoSortV2);

