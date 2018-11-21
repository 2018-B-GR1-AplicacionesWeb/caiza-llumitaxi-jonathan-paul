"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var inquirer = require('inquirer');
var readline = require('readline');
var fs = require('fs');
var opcionesMenu_1 = require("./opcionesMenu");
var operacionesCRUD_1 = require("./operacionesCRUD");
// mostrarPelicula();
var encabezadoApp = '\n ________________________________________________\n|' +
    '                                                |\n|\t      VENTA DE PELICULAS                 |' +
    '\n|________________________________________________|\n\n';
// leerArchivo('peliculas.txt');
console.log(encabezadoApp);
inquirer
    .prompt(opcionesMenu_1.menuPrincipal)
    .then(function (respuestas) {
    if (respuestas.opciones === 'Create') {
        console.clear();
        console.log('\n ________________________________________________');
        console.log('|                                                |');
        console.log('|\t      REGISTRO DE PELICULAS              |');
        console.log('|________________________________________________|');
        console.log('|                                                |');
        console.log('| Ingrese los datos de la pelicula:              |');
        console.log('|________________________________________________|\n');
        inquirer
            .prompt(opcionesMenu_1.preguntasRegistroPelicula)
            .then(function (respuestasFormulario) {
            //console.log(respuestasFormulario);
            // mostrarPelicula();
            operacionesCRUD_1.funcionEscritura('peliculas.txt', respuestasFormulario)
                .then(function (contenidoDelArchivo) {
                //console.log('Todo bien', contenidoDelArchivo);
                console.log('\n\tInformacion registrada correctamente');
            })
                .catch(function (resultadoError) {
                // console.log('Algo malo paso', resultadoError);
                console.log('\n\tOcurrio un error en el guardado intenta nuevamente');
            });
        });
    }
    ;
    if (respuestas.opciones === 'Read') {
        operacionesCRUD_1.mostrarPelicula();
    }
    ;
    if (respuestas.opciones === 'Update') {
        inquirer
            .prompt(opcionesMenu_1.preguntaBuscarPelicula)
            .then(function (respuestaPelicula) {
            operacionesCRUD_1.funcionActualizarpelicula(respuestaPelicula.nombrePelicula);
        });
    }
    ;
    if (respuestas.opciones === 'Delete') {
        inquirer
            .prompt(opcionesMenu_1.preguntaEliminarPelicula)
            .then(function (respuestaParaBorrar) {
            operacionesCRUD_1.eliminarPelicula(respuestaParaBorrar.nombrePelicula);
        });
    }
    ;
});
