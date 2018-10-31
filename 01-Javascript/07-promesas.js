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
/*
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


*/



/*******************************************************************************/
/*
const nuevaPromesaAppendFile = (nombreArchivo,contenidoArchivo) => {
    return new Promise(
        (resolve, reject) => {
            fs.readFile(nombreArchivo,'utf-8',
                (error,contenidoArchivoLeido)=>{
                    if (error){
                        fs.writeFile(nombreArchivo,contenidoArchivo,
                            (err)=>{
                                if (err) {
                                    reject(console.error('Error escribiendo'));
                                } else {
                                    resolve(contenidoArchivo);
                                }
                            }
                        );
                    }else{
                        fs.writeFile(nombreArchivo,contenidoArchivoLeido+contenidoArchivo,
                            (err)=>{
                                if (err) {
                                    reject(console.error('Error escribiendo'));
                                } else {
                                    resolve(contenidoArchivoLeido+contenidoArchivo);
                                }
                            }
                        );
                    }

                }
            );
        }
    );
};

nuevaPromesaAppendFile('06-texto.txt','\n Adios Mundo')
    .then(
        (resultadoOk) => {
            console.log('Todo bien', resultadoOk);
        }
    )
    .catch(
        (resultadoError) => {
            console.log('Algo malo paso', resultadoError);
        }
    );





*/



const appendFilePromesa = (nombreArchivo,nuevoContenidoArchivo) => {
    return new Promise(
        (resolve, reject) => {
            fs.readFile(nombreArchivo, 'utf-8',
                (error, contenidoArchivoLeido) => {
                    if (error) {
                        fs.writeFile(nombreArchivo, contenidoArchivo, (err) => {
                            if (err) {
                                reject(console.error('Error escribiendo'));
                            } else {
                                resolve(contenidoArchivoLeido);
                            }
                        });
                    } else {
                        fs.writeFile(
                            nombreArchivo,
                            contenidoArchivoLeido + nuevoContenidoArchivo, (err) => {
                                if (err) {
                                    reject(console.error('Error escribiendo'));
                                } else {
                                    resolve(contenidoArchivoLeido + nuevoContenidoArchivo);
                                }
                            }
                        );
                    }
                }
            );
        }
    );
}

appendFilePromesa('06-texto.txt','\n Adios Mundo')
    .then(
        (contenidoArchivo) => {
            console.log('Todo bien', contenidoArchivo);
        }
    )
    .catch(
        (resultadoError) => {
            console.log('Algo malo paso', resultadoError);
        }
    );




// SYNC  y  ASYNC
//ASYNC  --> Se demora algo ?
// Callback  ---> funcion Anonima

const funcionConCallback = function (parametros, callback) {
    callback(); //...
};

//Promesas --> new Promise

const funcionConCallback = function (parametros) {
    return new PromiseRejectionEvent(
        (resolve, reject) => {
            resolve();
            reject();
        }
    );
};






