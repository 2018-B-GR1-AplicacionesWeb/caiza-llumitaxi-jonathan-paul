//definicion de las opciones del programa
export const opcionesMenu = [
    'Create','Read','Update','Delete',
];
//Definicion del tipo de peliculas
export const tiposPeliculas = [
    'Terror','Accion','Ciencia Ficcion', 'Trillers','Animado', 'Comedia'
];
//Se muestra el menu principal con sus opciones
export const menuPrincipal = [
    { type: 'list', name: 'opciones', message: 'Escoga la opción que desee:', choices: opcionesMenu },
];
//preguntas para la optencion de los datos de regitro de peliculas
export const preguntasRegistroPelicula = [
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
    { type: 'list', name: 'tipoPelicula', message: 'Escoga categoria:', choices: tiposPeliculas },
    { type: 'input', name: 'actorPrincipal', message: 'Ingrese nombre del actor principal:'},
    { type: 'input', name: 'añoLanzamiento', message: 'Ingrese el año de lanzamiento'},
    { type: 'input', name: 'precioPelicula', message: 'Ingrese el precio de la Pelicula'},
];
//Preguntas para actulizar la informacion de una pelicula
export  const preguntaActualizarPelicula = [
    { type: 'input', name: 'precioPelicula', message: 'Ingrese el precio de la pelicula:' },
    { type: 'list', name: 'tipoPelicula', message: 'Escoga la categoria:', choices: tiposPeliculas },
    { type: 'input', name: 'actorPrincipal', message: 'Ingrese nombre del actor principal:'},
    { type: 'input', name: 'añoLanzamiento', message: 'Ingrese el año de lanzamiento'},
];
//Pregunta para eliminar pelicula por nombre
export  const preguntaEliminarPelicula = [
    { type: 'input', name: 'nombrePelicula', message: '¿Qué Pelicula desea borrar?' }];
//Pregunta para buscar la pelicula por nombre
export const preguntaBuscarPelicula = [
    { type: 'input', name: 'nombrePelicula', message: '¿Qué pelicula desea buscar?' }];