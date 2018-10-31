const  fs = require('fs');
/*
const respuesta = {
    nombreArchivo :'',
    contenidoArchivo :'',
    erroe : ''
};

const ejercicioDeArchivos = (arregloString, callback)=>{
    console.log('Inicio');
    return new Promise(
        (resolve, reject) => {
            const arregloRespuestas = [];
            arregloString
                .forEach(
                    (string, indice) => {
                        const archivo = `${indice} - ${string}.txt`;
                        const contenido = string;
                        fs.writeFile(archivo,
                            contenido,
                            (error) => {
                                const respuesta = {
                                    nombreArchivo: archivo,
                                    contenidoArchivo: contenido,
                                    erroe: error
                                };
                                arregloRespuestas.push(respuesta);
                                const tamañoRespuesta = arregloRespuestas.length;

                                if (tamañoRespuesta === arregloString.length) {
                                    //console.log(arregloRespuestas);
                                   //callback(arregloRespuestas);
                                    resolve(arregloRespuestas);
                                }
                            }
                        );
                    }
                )
        }
        )
}

const arregloStrings =['A','B','C'];

// ejercicioDeArchivos(arregloStrings,
//     (arregloRespuestas) => {
//         console.log(arregloRespuestas);
//     }
// )
ejercicioDeArchivos(arregloStrings)
    .then(
        (arregloRespuestas) => {
            console.log('Todo bien', arregloRespuestas);
        }
    )
    .catch(
        (resultadoError) => {
            console.log('Algo malo paso', resultadoError);
        }
    );
*/
// -----------------------------------------------------------------------------------------------


const appendFilePromesa = (nombreArchivo, contenidoArchivo) =>{
    return new Promise(
        (resolve, reject) => {
            fs.readFile(nombreArchivo, 'utf-8',
                (error, contenidoArchivoLeido) => {
                    if (error) {
                        fs.writeFile(nombreArchivo, contenidoArchivo, (err) => {
                            if (err) {
                                //console.error('Error escribiendo');
                                //callback(undefined, 'Error escribiendo');
                                reject('Error escribiendo');
                            } else {
                                console.log('Archivo creado');
                                //callback(contenidoArchivo);
                                resolve(contenidoArchivo);
                            }
                        });
                    } else {
                        fs.writeFile(
                            nombreArchivo,
                            contenidoArchivoLeido + contenidoArchivo, (err) => {
                                if (err) {
                                    //console.error('Error escribiendo');
                                    reject('Error escribiendo');
                                    //return 'ERROR'
                                } else {
                                    console.log('Archivo creado');
                                    //callback(contenidoArchivoLeido + contenidoArchivo);
                                    resolve(contenidoArchivoLeido + contenidoArchivo);
                                }
                            });
                    }
                }
            );
        }
    )
}

// appendFile('06-texto.txt','\n Adios Mundo',
//     (contenidoArchivo, error) => {  //Callback
//         if(error){
//             console.log(error);
//         }else{
//             console.log(contenidoArchivo);
//         }
//     }
// );

appendFilePromesa('06-texto.txt','\n Adios Mundo')
    .then(
        (contenidoResultante)=>{
            console.log(contenidoResultante);
        }
    )
    .catch(
        (resultadoError)=>{
            console.log(resultadoError);
        }
    );
