var nombre = 'Jonathan';
var edad = 23;
var nada = null;
var casado = false;
var loQueSea = {};
loQueSea = 1;
loQueSea = 'Facil';
loQueSea = true;
var fechaNacimiento = new Date();
var identificador = '1';
identificador = 1;
identificador = 'uno';
var usuario = {
    nombre: 'Jonathan',
    apellido: 'Caiza'
};
var Usuario = /** @class */ (function () {
    function Usuario() {
    }
    return Usuario;
}());
var usuario1 = {
    nombre: 'Jonathan',
    apellido: 'Caiza'
};
function sumarDosNumeros(numUno, numDos) {
    return numUno + numDos;
}
;
sumarDosNumeros(2, 2);
var saludar = function (nombre, //si se pone tipado a una sola variable es necesario poner parentesis
apellido) {
    var infinito = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        infinito[_i - 2] = arguments[_i];
    }
    return 2; // o se puedes ahcer un pipe ' string | number '
};
saludar('nombre', 'caiza', 5, 1, 2, 3);
console.log();
var respuesta = saludar('nombre', 'caiza', 1, 2, 3, 4);
var respuesta2 = saludar('nombre', 'caiza', 1, 2, 3, 4);
var respuesta3 = saludar('nombre', 'caiza', 1, 2, 3, 4);
respuesta = respuesta.toUpperCase();
var nombreDos = 'Jonathan'; //duck typing  //si parece como pato si camina como ganzo si.. es un pato
