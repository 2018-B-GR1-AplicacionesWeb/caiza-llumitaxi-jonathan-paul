function holaMundo() {
    console.log('Hola mundo');
}

holaMundo(); //Hola mundo

console.log(holaMundo());

function sumarNNumeros(...numeros){
    //numeroUno, numeroDos) {

    //var tieneUnParametroDiferentedeNumber = false;
    var resultado = sumarNumerosDesdeUnArreglo(numeros);
    if(resultado.noEsNUmber){
        console.error('No envia numeros');
        return 0;
    }else{
        return resultado.resultado;
    }

    /*
    for (var i=0; i<numeros.length; i++){
        var esNumeroNumber = numeros[i] == 'number';
        if(!esNumeroNumber){
            tieneUnParametroDiferentedeNumber = true;
        }else{
            resultad = resultado + numeros[i];
        }
    }*/
    /*
    if(tieneUnParametroDiferentedeNumber){
        console.error('No envia numeros');
        return 0;
    }else{
        return resultado;
    }*/

/*    var esNumerNumeroUno = typeof numeroUno == 'number';  //Validadcion es numero
    var esNumerNumeroDos = typeof numeroDos == 'number'; //Validacion es numero

    if(esNumerNumeroDos && esNumerNumeroUno){
        return numeroUno + numeroDos;
    }else{
        console.error('No envia numeros');
        return 0;
    }*/
}

/*console.log(sumarDosNumeros(1,2));
console.log(sumarDosNumeros('Jonathan',true, null, {}, 5, 6, 7));
*/



function sumarNumerosDesdeUnArreglo(numeros){
    var tieneUnParametroDiferenteDeNumber = false;
    var resultado =0;
    for (var i = 0; i < numeros.length; i++) {
        var esNumeroNumber = typeof numeros[i] == 'number';
        if (!esNumeroNumber) {
            tieneUnParametroDiferenteDeNumber = true;
        } else{
            resultado = resultado + numeros[i]
        }
    }
    return {
        noEsNumber:tieneUnParametroDiferenteDeNumber,
        resultado:resultado
    }
}
//console.log(sumarNNumeros(1,2,3,'asd, true, false'));
console.log(sumarNNumeros(1,2,3,4));

//console.log()




/*
function saludarEnUpperCase(nombre, funcion) {
    funcion()
    return `Hola ${nombre.toUpperCase()}`;//Template strings
}
*/


function saludarEnUpperCase(nombre, funcion) {
    return `Hola ${funcion(nombre)}`;//Template strings
}

console.log(saludarEnUpperCase("jonathan", convertirStringEnMayuscula));
console.log(saludarEnUpperCase("PAUL", convertirStringEnMinusculaa));
console.log(saludarEnUpperCase("Buenos dias", añadirPuntoAlfinal));


function convertirStringEnMayuscula(text) {
    return text.toUpperCase();
}
function convertirStringEnMinusculaa(text) {
    return text.toLowerCase();
}

function añadirPuntoAlfinal(text) {
    return text + ".";
}

function primeraLetraEnMayuscula(texto) {
    var primeraLetra = texto[0].toUpperCase();
    var restoPalabra = texto.slice(1,texto.lenth);
    return primeraLetra + restoPalabra;
}


console.log(primeraLetraEnMayuscula('paul'))


