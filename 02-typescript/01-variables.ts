const nombre: string = 'Jonathan';
const edad: number = 23;
const nada = null;
const casado: boolean = false;
let loQueSea: any = {};

loQueSea = 1;
loQueSea = 'Facil';
loQueSea = true;

const fechaNacimiento: Date = new Date();
let identificador: number | string = '1';
identificador = 1;
identificador = 'uno';

//tsc nombreArchivo --target es3




/*let usuario: UsuarioInterface{  //los dospuntos ':' es apra el tipo
    nombre:string;
    apellido:string;
    edad ?: number | string;   // la incognita le dice al tranpilador '?' que etsa variable es opcional
} = { // el igual '=' es para el valor
    nombre: 'Jonathan',
    apellido: 'Caiza'
};*/

//usuario.edad = '2';

interface UsuarioInterface {
    nombre:string;
    apellido:string;
    edad ?: number | string;   // la incognita le dice al tranpilador '?' que etsa variable es opcional
}

let usuario: UsuarioInterface = { // el igual '=' es para el valor
    nombre: 'Jonathan',
    apellido: 'Caiza'
};


class Usuario{
    public nombre:string;
    public apellido:string;
    public edad ?: number | string;
}

let usuario1: Usuario = { // el igual '=' es para el valor
    nombre: 'Jonathan',
    apellido: 'Caiza'
};

function sumarDosNumeros(
    numUno: number,
    numDos: number) {
    return numUno + numDos;
};

sumarDosNumeros(2, 2);

const saludar = (nombre:string, //si se pone tipado a una sola variable es necesario poner parentesis
                 apellido: string,// si se peude suar ?
                 ...infinito: number [] ): any  => {  //definir parametros infinitos es posible,, es posibe definir con void si no queremos q se devuelva anda
    return 2;                                             // o se puedes ahcer un pipe ' string | number '
};

saludar('nombre', 'caiza',5,1,2,3,);

console.log();

let respuesta = <string> saludar('nombre', 'caiza',1,2,3,4);
let respuesta2:string = saludar('nombre', 'caiza',1,2,3,4);
let respuesta3: any = saludar('nombre', 'caiza',1,2,3,4);

respuesta = respuesta.toUpperCase();


let nombreDos = 'Jonathan';  //duck typing  //si parece como pato si camina como ganzo si.. es un pato






