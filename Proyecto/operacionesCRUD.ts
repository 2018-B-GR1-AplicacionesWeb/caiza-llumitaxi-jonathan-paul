import {preguntaActualizarPelicula} from "./opcionesMenu";
import {__await} from "tslib";
let inquirer = require('inquirer');
let fs = require('fs');

export function leerArchivo(nombreArchivo) {
    return new Promise(function (resolve, reject) {
        fs.readFile(nombreArchivo, 'utf-8', function (error, contenidoArchivoLeido) {
            if (error) {
                reject('\n\tError al leer');
            }
            else {
                resolve(contenidoArchivoLeido);
            }
        });
    });
}

interface peliculInterface {
    'idPelicula':number,
    'nombrePelicula':string,
    'tipoPelicula':string,
    'actorPrincipal':string,
    'añoLanzamiento':string,
    'precioPelicula':string
}

export function obtenerlistaPeliculas() {
    return new Promise(function (resolve, reject) {
        // resolve(contenidoArchivoLeido);

        leerArchivo('peliculas.txt')
            .then(function (contenidoDelArchivo) {
                let arregloJson=[];
                contenidoDelArchivo.split(/\n/).map(
                    (linea) =>{
                        if(linea!==''){
                            arregloJson.push(JSON.parse(linea));
                        }
                });
                resolve(arregloJson);
            })
            .catch(function (resultadoError) {
                console.log('\n\t\tAlgo malo paso\n\n', resultadoError);
            });
    });
}

export function mostrarPelicula(){
    console.clear();
    console.log('\n ________________________________________________');
    console.log('|                                                |');
    console.log('|\t      LISTA DE PELICULAS                 |');
    console.log('|________________________________________________|');
    obtenerlistaPeliculas().then(
        function (contenidoDelArchivo) {
            contenidoDelArchivo.forEach(function (value, key) {
                if(value!==undefined) {
                    var valor = value;
                    console.log('\n   Pelicula ' + (key + 1) +
                        '\n\n\tIdPelicula: ' + valor.idPelicula +
                        '\n\tNombre: ' + valor.nombrePelicula +
                        '\n\tCategoria: ' + valor.tipoPelicula +
                        '\n\tAño: ' + valor.añoLanzamiento +
                        '\n\tActor: ' + valor.actorPrincipal +
                        '\n\tPrecio: ' + valor.precioPelicula
                    );
                }
            });
        }
    ).catch(function (resultadoError) {
        console.log('\n\tOcurrio un error al cargar las peliculas\n\n');
    });
}

export const funcionEscritura = (nombreArchivo, pelicula)=>{
    return new Promise(function (resolve, reject) {
        fs.readFile(nombreArchivo, 'utf-8', function (error, contenidoArchivoLeido) {
            if (error) {
                fs.writeFile(nombreArchivo, JSON.stringify(pelicula) + '\n', function (err) {
                    if (err) {
                        console.error(pelicula);
                        reject('Error escribiendo');
                    }
                    else {
                        console.log('Archivo creado');
                        resolve(JSON.stringify(pelicula) + '\n');
                    }
                });
            }
            else {
                fs.writeFile(nombreArchivo, contenidoArchivoLeido + JSON.stringify(pelicula) + '\n', function (err) {
                    if (err) {
                        reject('Error escribiendo');
                    }
                    else {
                        resolve(contenidoArchivoLeido + JSON.stringify(pelicula) + '\n');
                    }
                });
            }
        });
    });
};

export function eliminarPelicula(nombrePelicula:string) {
    let arregloNuevo: peliculInterface[] = [];
    let salida: string = '';
    obtenerlistaPeliculas()
        .then(
            function (contenidoDelArchivo) {
                contenidoDelArchivo.forEach(function loop(value, key) {
                    if (value.nombrePelicula === nombrePelicula) {
                        console.log('\n\tArchivo encontrado\n');
                        contenidoDelArchivo.splice(key, 1);
                        //return;
                    }
                })

                arregloNuevo = contenidoDelArchivo;
                funcionBorrar('peliculas.txt')
                    .then(
                        (mensaje)=>{
                            arregloNuevo.forEach(function loop(value, key) {
                                // console.log(value)
                                // console.log('\n')
                                salida += JSON.stringify(value) + '\n';
                            })
                            console.log(mensaje)
                            funcionActualizarArchivo('peliculas.txt', salida)
                                .then(
                                (mensaje)=>{
                                    console.log(mensaje);
                                }
                            ).catch(
                                (mensaje)=>{
                                    console.log(mensaje);
                                }
                            );
                        }
                    )
            }
        )
        .catch(
            function (resultadoError) {
            console.log('Ocurrio un error al cargar las peliculas\n\n');
        });
    console.log('Informacion Actualizada correctamente');
}

export function funcionBorrar(nombreDelArchivo) {
    return new Promise(
        (resolve, reject) => {
            fs.unlink(nombreDelArchivo, (err) => {
                if (err) {
                    reject('NoEliminado');
                } else {
                    resolve('Eliminado');
                }
            })
        }
    )
}

export const funcionActualizarArchivo = (nombreDelArchivo,contenido)=>{
    return new Promise(
        (resolve,reject)=>{
            fs.writeFile(nombreDelArchivo,contenido,
                (error)=> {
                    if(error){
                        reject('ERROR AL ACTUALIZAR EL ARCHIVO')
                    }else {
                        resolve ('SE ACTUALIZÓ CORRECTAMENTE')
                    }
                }
            )
        }
    )};


export const funcionActualizarpelicula = (nombrePeliculaActualizar)=>{
    let arregloNuevo: peliculInterface[] = [];
    let salida: string = '';
    let indice:number = -1;
    obtenerlistaPeliculas()
        .then(
            function (contenidoDelArchivo) {
                contenidoDelArchivo.forEach(function loop(value, key) {

                    if (value.nombrePelicula === nombrePeliculaActualizar) {
                        // nombrePeliculaActualizar
                        //contenidoDelArchivo.splice(key, 1);
                        console.log(nombrePeliculaActualizar +'  => '+value.nombrePelicula );
                        indice = key;
                        return 0;
                    }
                    // else{
                    //     console.log('La pelicula ingresada no existe en el sistema')
                    // }
                })
                if(indice!==-1){
                    inquirer
                        .prompt(preguntaActualizarPelicula)
                        .then((respuestaDatosActualziados) => {
                                contenidoDelArchivo[indice].precioPelicula = respuestaDatosActualziados.precioPelicula;
                                contenidoDelArchivo[indice].tipoPelicula = respuestaDatosActualziados.tipoPelicula;
                                contenidoDelArchivo[indice].actorPrincipal = respuestaDatosActualziados.actorPrincipal;
                                contenidoDelArchivo[indice].añoLanzamiento = respuestaDatosActualziados.añoLanzamiento;

                                arregloNuevo = contenidoDelArchivo;
                                funcionBorrar('peliculas.txt')
                                    .then(
                                        () => {
                                            arregloNuevo.forEach(function loop(value, key) {
                                                salida += JSON.stringify(value) + '\n';
                                            })
                                            funcionActualizarArchivo('peliculas.txt', salida);
                                        }
                                    ).catch()
                            }
                        )

                }else{
                    console.log('La pelicula ingresada no existe en el sistema');
                }
            }
        )
        .catch(
            function (resultadoError) {
                console.log('Ocurrio un error al cargar las peliculas\n\n');
            });
    console.log('Informacion Actualizada correctamente');
}




// export const funcionBuscar= (nombreDelArchivo)=>{
//     fs.readFile(nombreDelArchivo,'utf-8',
//         (error,contenidoArchivo)=>{
//             return new Promise(
//                 (resolve,reject)=>{
//                     if(error){
//                         reject({
//                             mensaje:'ERROR AL BUSCAR EL ARCHIVO',
//                         })
//                     }else {
//                         resolve (
//                             console.log(contenidoArchivo)
//                         )
//                     }
//                 }
//             )
//
//         }
//     );
// }





//
// export function mostrarPelicula2() {
//     console.clear();
//     console.log('\n ________________________________________________');
//     console.log('|                                                |');
//     console.log('|\t      LISTA DE PELICULAS                 |');
//     console.log('|________________________________________________|');
//     leerArchivo('peliculas.txt')
//         .then(function (contenidoDelArchivo) {
//            let listaPeliculas = obtenerPeliculas();
//             console.log(listaPeliculas.forEach(function (value, key) {
//                 var valor = value;
//                 console.log('   Pelicula'+(key + 1) +
//                     '\n\tIdPelicula: ' + valor.idPelicula +
//                     '\n\tNombre: ' + valor.nombrePelicula +
//                     '\n\tCategoria: ' + valor.tipoPelicula +
//                     '\n\tAño: ' + valor.añoLanzamiento +
//                     '\n\tActor: ' + valor.actorPrincipal +
//                     '\n\tPrecio: ' + valor.precioPelicula
//                 );
//             }));
//         })
//         .catch(function (resultadoError) {
//             console.log('Algo malo paso\n\n', resultadoError);
//         });
//     // let arreglo = texto.split(/\r?\n/).map(function(linea){
//     //     return linea.split(' ');
//     // };
//     // var arregloJson = JSON.stringify(arreglo);
//     console.log('\n|________________________________________________|\n');
// }


