"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//definicion de las opciones del programa
exports.opcionesMenu = [
    'Create', 'Read', 'Update', 'Delete',
];
//Definicion del tipo de peliculas
exports.tiposPeliculas = [
    'Terror', 'Accion', 'Ciencia Ficcion', 'Trillers', 'Animado', 'Comedia'
];
//Se muestra el menu principal con sus opciones
exports.menuPrincipal = [
    { type: 'list', name: 'opciones', message: 'Escoga la opción que desee:', choices: exports.opcionesMenu },
];
//preguntas para la optencion de los datos de regitro de peliculas
exports.preguntasRegistroPelicula = [
    {
        type: 'input',
        name: 'idPelicula',
        message: 'Ingrese id de la pelicula:',
        validate: function (value) {
            var valid = !isNaN(parseFloat(value));
            return valid || '\n \t\tIngrese un Id valido debe ser numero\n';
        },
        filter: Number
    },
    { type: 'input', name: 'nombrePelicula', message: 'Ingrese el nombre de la pelicula:' },
    { type: 'list', name: 'tipoPelicula', message: 'Escoga categoria:', choices: exports.tiposPeliculas },
    { type: 'input', name: 'actorPrincipal', message: 'Ingrese nombre del actor principal:' },
    { type: 'input', name: 'añoLanzamiento', message: 'Ingrese el año de lanzamiento' },
    { type: 'input', name: 'precioPelicula', message: 'Ingrese el precio de la Pelicula' },
];
//Preguntas para actulizar la informacion de una pelicula
exports.preguntaActualizarPelicula = [
    { type: 'input', name: 'precioPelicula', message: 'Ingrese el precio de la pelicula:' },
    { type: 'list', name: 'tipoPelicula', message: 'Escoga la categoria:', choices: exports.tiposPeliculas },
    { type: 'input', name: 'actorPrincipal', message: 'Ingrese nombre del actor principal:' },
    { type: 'input', name: 'añoLanzamiento', message: 'Ingrese el año de lanzamiento' },
];
//Pregunta para eliminar pelicula por nombre
exports.preguntaEliminarPelicula = [
    { type: 'input', name: 'nombrePelicula', message: '¿Qué Pelicula desea borrar?' }
];
//Pregunta para buscar la pelicula por nombre
exports.preguntaBuscarPelicula = [
    { type: 'input', name: 'nombrePelicula', message: '¿Qué pelicula desea buscar?' }
];
