let inquirer = require('inquirer');
let readline = require('readline');
let fs = require('fs');

import {menuPrincipal,preguntaEliminarPelicula,preguntasRegistroPelicula,preguntaActualizarPelicula,preguntaBuscarPelicula} from './opcionesMenu';
import {mostrarPelicula,funcionEscritura,eliminarPelicula,funcionActualizarpelicula} from './operacionesCRUD';

// mostrarPelicula();

const encabezadoApp = '\n ________________________________________________\n|'+
    '                                                |\n|\t      VENTA DE PELICULAS                 |'+
    '\n|________________________________________________|\n\n';

// leerArchivo('peliculas.txt');
console.log(encabezadoApp);
inquirer
    .prompt(menuPrincipal)
    .then((respuestas) => {

        if (respuestas.opciones === 'Create'){
            console.clear();
            console.log('\n ________________________________________________');
            console.log('|                                                |');
            console.log('|\t      REGISTRO DE PELICULAS              |');
            console.log('|________________________________________________|');
            console.log('|                                                |');
            console.log('| Ingrese los datos de la pelicula:              |');
            console.log('|________________________________________________|\n');
            inquirer
                .prompt(preguntasRegistroPelicula)
                .then((respuestasFormulario) => {
                        //console.log(respuestasFormulario);
                    // mostrarPelicula();
                        funcionEscritura('peliculas.txt',respuestasFormulario)
                            .then(function (contenidoDelArchivo) {
                                //console.log('Todo bien', contenidoDelArchivo);
                                console.log('\n\tInformacion registrada correctamente');
                            })
                            .catch(function (resultadoError) {
                                // console.log('Algo malo paso', resultadoError);
                                console.log('\n\tOcurrio un error en el guardado intenta nuevamente');
                            });
                    })
        };
        if(respuestas.opciones === 'Read'){
            mostrarPelicula();
        };
        if(respuestas.opciones === 'Update' ){
            inquirer
                .prompt(preguntaBuscarPelicula)
                .then((respuestaPelicula) => {
                        funcionActualizarpelicula(respuestaPelicula.nombrePelicula);
                    }
                )
        };
        if(respuestas.opciones === 'Delete'){
            inquirer
                .prompt(preguntaEliminarPelicula)
                .then((respuestaParaBorrar) => {
                        eliminarPelicula(respuestaParaBorrar.nombrePelicula);
                    }
                )
        };
    });
