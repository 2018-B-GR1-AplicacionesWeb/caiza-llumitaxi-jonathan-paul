//07-promesas.js
/*
const  fs = require('fs');

const nuevaPromesa = new Promise(
    (resolve, reject) =>{ //
        fs.readFile('06-texto.txt', 'utf-8',
            (err, contenidoArchivo) =>{
                if(err){
                    reject(err);
                }else{
                    resolve(contenidoArchivo);
                }
            }
        );
    }
);

console.log(nuevaPromesa);

nuevaPromesa
    .then(
        (resultadoOk) =>{
            console.info('Todo bien', resultadoOk);
        }
    )
    .catch(
        (resultadoError) =>{
            console.log('Algo malo paso', resultadoError);
        }
    );




const nuevaPromesaEscritura = new Promise(
    (resolve, reject) =>{ //
        fs.writeFile('06-texto.txt', 'Web GR1',
            (err, contenidoArchivo) =>{
                if(err){
                    reject(err);
                }else{
                    resolve('lo que sea');
                }
            }
        );
    }
);

//console.log(nuevaPrmesaEscritura);


//OPERADOR TEERNARIO
// TRUE ? 1:2   ----> si e sverdadero da 1 si es falso da 2

nuevaPrmesaLectura
    .then(
        (resultadoOk) =>{
            console.info('Todo bien', resultadoOk);
        }
    )
    .catch(
        (resultadoError) =>{
            console.log('Algo malo paso', resultadoError);
        }
    );

*/


const fs = require('fs');

const nuevaPromesaLectura = new Promise(
    (resolve, reject) => {
        fs.readFile('06-texto22.txt', 'utf-8',
            (err, contenidoArchivo) => {
                if (err) {
                    //reject(err);
                    resolve ('');
                } else {
                    resolve(contenidoArchivo);
                }
            });
    }
);


const nuevaPromesaEscritura = (contenidoLeido) => {
    return new Promise(
        (resolve, reject) => {

            const contenido = contenidoLeido ? contenidoLeido + 'Otro ola' : 'Otro ola';

            fs.writeFile('06-texto.txt', contenido,
                (err,) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve('LO QUE SEA');
                    }
                });
        }
    );
};

nuevaPromesaLectura
    .then(
        (contenidoArchivo) => {
            console.log('Todo bien', contenidoArchivo);
            return nuevaPromesaEscritura(contenidoArchivo);
        }
    )
    //Se puede concatenar promesas
    .then(
        (contenidoCompleto) =>{
            console.log('Contenido completo', contenidoCompleto)
        }
    )
    .catch(
        (resultadoError) => {
            console.log('Algo malo paso', resultadoError);
        }
    );






/*******************************************************************************/


const appendFilePromesaLectura = (nombreArchivo, contenidoLeido) => {
    (resolve, reject) => {
        fs.readFile(nombreArchivo, 'utf-8',
            (err, contenidoArchivo) => {
                if (err) {
                    //reject(err);
                    resolve('');
                } else {
                    resolve(contenidoArchivo);
                }
            });
    }
}


const appendFilePromesaEscritura = (nombreArchivo, contenidoLeido) => {
    return new Promise(
        (resolve, reject) => {
            const contenido = contenidoLeido ? contenidoLeido + 'Otro ola' : 'Otro ola';
            fs.writeFile(nombreArchivo, contenidoLeido,
                (err,) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve('LO QUE SEA');
                    }
                });
        }
    );
};

nuevaPromesaLectura
    .then(
        (nombreArchivo, contenidoArchivo ) => {
            console.log('Todo bien', contenidoArchivo);
            return nuevaPromesaEscritura(contenidoArchivo, '\n Agregar mas texto');
        }
    )
    //Se puede concatenar promesas
    .then(
        (contenidoCompleto, contenidoArchivo) =>{
            console.log('Contenido completo', contenidoCompleto)
        }
    )
    .catch(
        (resultadoError) => {
            console.log('Algo malo paso', resultadoError);
        }
    );
