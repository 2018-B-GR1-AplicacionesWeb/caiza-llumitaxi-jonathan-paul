"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var opcionesMenu_1 = require("./opcionesMenu");
var inquirer = require('inquirer');
var fs = require('fs');
function leerArchivo(nombreArchivo) {
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
exports.leerArchivo = leerArchivo;
function obtenerlistaPeliculas() {
    return new Promise(function (resolve, reject) {
        // resolve(contenidoArchivoLeido);
        leerArchivo('peliculas.txt')
            .then(function (contenidoDelArchivo) {
            var arregloJson = [];
            contenidoDelArchivo.split(/\n/).map(function (linea) {
                if (linea !== '') {
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
exports.obtenerlistaPeliculas = obtenerlistaPeliculas;
function mostrarPelicula() {
    console.clear();
    console.log('\n ________________________________________________');
    console.log('|                                                |');
    console.log('|\t      LISTA DE PELICULAS                 |');
    console.log('|________________________________________________|');
    obtenerlistaPeliculas().then(function (contenidoDelArchivo) {
        contenidoDelArchivo.forEach(function (value, key) {
            if (value !== undefined) {
                var valor = value;
                console.log('\n   Pelicula ' + (key + 1) +
                    '\n\n\tIdPelicula: ' + valor.idPelicula +
                    '\n\tNombre: ' + valor.nombrePelicula +
                    '\n\tCategoria: ' + valor.tipoPelicula +
                    '\n\tAño: ' + valor.añoLanzamiento +
                    '\n\tActor: ' + valor.actorPrincipal +
                    '\n\tPrecio: ' + valor.precioPelicula);
            }
        });
    }).catch(function (resultadoError) {
        console.log('\n\tOcurrio un error al cargar las peliculas\n\n');
    });
}
exports.mostrarPelicula = mostrarPelicula;
exports.funcionEscritura = function (nombreArchivo, pelicula) {
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
function eliminarPelicula(nombrePelicula) {
    var arregloNuevo = [];
    var salida = '';
    obtenerlistaPeliculas()
        .then(function (contenidoDelArchivo) {
        contenidoDelArchivo.forEach(function loop(value, key) {
            if (value.nombrePelicula === nombrePelicula) {
                console.log('\n\tArchivo encontrado\n');
                contenidoDelArchivo.splice(key, 1);
                //return;
            }
        });
        arregloNuevo = contenidoDelArchivo;
        funcionBorrar('peliculas.txt')
            .then(function (mensaje) {
            arregloNuevo.forEach(function loop(value, key) {
                // console.log(value)
                // console.log('\n')
                salida += JSON.stringify(value) + '\n';
            });
            console.log(mensaje);
            exports.funcionActualizarArchivo('peliculas.txt', salida)
                .then(function (mensaje) {
                console.log(mensaje);
            }).catch(function (mensaje) {
                console.log(mensaje);
            });
        });
    })
        .catch(function (resultadoError) {
        console.log('Ocurrio un error al cargar las peliculas\n\n');
    });
    console.log('Informacion Actualizada correctamente');
}
exports.eliminarPelicula = eliminarPelicula;
function funcionBorrar(nombreDelArchivo) {
    return new Promise(function (resolve, reject) {
        fs.unlink(nombreDelArchivo, function (err) {
            if (err) {
                reject('NoEliminado');
            }
            else {
                resolve('Eliminado');
            }
        });
    });
}
exports.funcionBorrar = funcionBorrar;
exports.funcionActualizarArchivo = function (nombreDelArchivo, contenido) {
    return new Promise(function (resolve, reject) {
        fs.writeFile(nombreDelArchivo, contenido, function (error) {
            if (error) {
                reject('ERROR AL ACTUALIZAR EL ARCHIVO');
            }
            else {
                resolve('SE ACTUALIZÓ CORRECTAMENTE');
            }
        });
    });
};
exports.funcionActualizarpelicula = function (nombrePeliculaActualizar) {
    var arregloNuevo = [];
    var salida = '';
    var indice = -1;
    obtenerlistaPeliculas()
        .then(function (contenidoDelArchivo) {
        contenidoDelArchivo.forEach(function loop(value, key) {
            if (value.nombrePelicula === nombrePeliculaActualizar) {
                // nombrePeliculaActualizar
                //contenidoDelArchivo.splice(key, 1);
                console.log(nombrePeliculaActualizar + '  => ' + value.nombrePelicula);
                indice = key;
                return 0;
            }
            // else{
            //     console.log('La pelicula ingresada no existe en el sistema')
            // }
        });
        if (indice !== -1) {
            inquirer
                .prompt(opcionesMenu_1.preguntaActualizarPelicula)
                .then(function (respuestaDatosActualziados) {
                contenidoDelArchivo[indice].precioPelicula = respuestaDatosActualziados.precioPelicula;
                contenidoDelArchivo[indice].tipoPelicula = respuestaDatosActualziados.tipoPelicula;
                contenidoDelArchivo[indice].actorPrincipal = respuestaDatosActualziados.actorPrincipal;
                contenidoDelArchivo[indice].añoLanzamiento = respuestaDatosActualziados.añoLanzamiento;
                arregloNuevo = contenidoDelArchivo;
                funcionBorrar('peliculas.txt')
                    .then(function () {
                    arregloNuevo.forEach(function loop(value, key) {
                        salida += JSON.stringify(value) + '\n';
                    });
                    exports.funcionActualizarArchivo('peliculas.txt', salida);
                }).catch();
            });
        }
        else {
            console.log('La pelicula ingresada no existe en el sistema');
        }
    })
        .catch(function (resultadoError) {
        console.log('Ocurrio un error al cargar las peliculas\n\n');
    });
    console.log('Informacion Actualizada correctamente');
};
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
