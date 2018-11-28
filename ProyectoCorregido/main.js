"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var opcionesMenu_1 = require("../Proyecto/opcionesMenu");
var inquirer = require('inquirer');
var fs = require('fs');
var rxjs = require('rxjs');
var timer = require('rxjs').timer;
var mergeMap = require('rxjs/operators').mergeMap;
var map = require('rxjs/operators').map;
////////////////////////////////////////////////////////RECURSOS///////////////////////////////////////
var nombreDelArchivo = 'bdd.json';
var preguntaMenu = {
    type: 'list',
    name: 'opcionMenu',
    message: 'ESCOGA UNA OPCION ',
    choices: [
        'Crear',
        'Borrar',
        'Buscar',
        'Actualizar',
    ]
};
/**********************Preguntas Cliente*******************************/
var preguntasActulizarCliente = [
    {
        type: 'input',
        name: 'idCliente',
        message: 'Ingrese ID Cliente: ',
    }
];
var preguntaEliminarClientePorNombre = [
    {
        type: 'input',
        name: 'nombre',
        message: '¿Cuál es el cliente que quiere eliminar? ',
    }
];
var preguntaBuscarNombreCliente = [
    {
        type: 'input',
        name: 'nombre',
        message: 'Ingrese nombre del Cliente a Buscar: ',
    }
];
var preguntaCliente = [
    {
        type: 'input',
        name: 'id',
        message: '¿Cual es tu id? '
    },
    {
        type: 'input',
        name: 'nombre',
        message: '¿Cual es tu nombre? '
    },
];
var preguntaActualizarCliente = [
    {
        type: 'input',
        name: 'nombre',
        message: 'Ingrese nombre del cliente: '
    },
];
/**********************Preguntas Pelicula*******************************/
var preguntaActualizarPelicula = [
    { type: 'input', name: 'precioPelicula', message: 'Ingrese el precio de la pelicula:' },
    { type: 'list', name: 'tipoPelicula', message: 'Escoga la categoria:', choices: opcionesMenu_1.tiposPeliculas },
    { type: 'input', name: 'actorPrincipal', message: 'Ingrese nombre del actor principal:' },
    { type: 'input', name: 'añoLanzamiento', message: 'Ingrese el año de lanzamiento' },
];
var preguntasRegistroPelicula = [
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
    { type: 'list', name: 'tipoPelicula', message: 'Escoga categoria:', choices: opcionesMenu_1.tiposPeliculas },
    { type: 'input', name: 'actorPrincipal', message: 'Ingrese nombre del actor principal:' },
    { type: 'input', name: 'añoLanzamiento', message: 'Ingrese el año de lanzamiento' },
    { type: 'input', name: 'precioPelicula', message: 'Ingrese el precio de la Pelicula' },
];
var preguntaEliminarPelicula = [
    { type: 'input', name: 'nombrePelicula', message: '¿Qué Pelicula desea borrar?' }
];
var preguntaBuscarPelicula = [
    { type: 'input', name: 'nombrePelicula', message: '¿Qué pelicula desea buscar?' }
];
/*************************** Base de Datos ***************************/
function inicialiarBDD() {
    return new Promise(function (resolve, reject) {
        fs.readFile(nombreDelArchivo, 'utf-8', function (error, contenidoArchivo) {
            if (error) {
                fs.writeFile(nombreDelArchivo, '{"clientes":[],"peliculas":[]}', function (error) {
                    if (error) {
                        reject({
                            mensaje: 'ERROR AL CREAR BASE',
                            error: 500
                        });
                    }
                    else {
                        resolve({
                            mensaje: 'BDD LEÍDA',
                            bdd: JSON.parse('{"clientes":[],"peliculas":[]}')
                        });
                    }
                });
            }
            else {
                resolve({
                    mensaje: 'BDD LEÍDA',
                    bdd: JSON.parse(contenidoArchivo)
                });
            }
        });
    });
}
/***************************** OperacionesCRUD **************************/
function main() {
    var respuestaBDD$ = rxjs.from(inicialiarBDD());
    respuestaBDD$
        .pipe(preguntarOpcionesMenu(), opcionesRespuesta(), ejecutarAcccion(), guardarBaseDeDatos())
        .subscribe(function (data) {
        // console.log(data);
    }, function (error) {
        console.log(error);
    }, function () {
        main();
        // console.log('Complete');
    });
}
function guardarBDD(bdd) {
    return new Promise(function (resolve, reject) {
        fs.writeFile(nombreDelArchivo, JSON.stringify(bdd), function (error) {
            if (error) {
                reject({
                    mensaje: 'Error creando',
                    error: 500
                });
            }
            else {
                resolve({
                    mensaje: 'BDD guardada',
                    bdd: bdd
                });
            }
        });
    });
}
function preguntarOpcionesMenu() {
    return mergeMap(// Respuesta Anterior Observable
    function (respuestaBDD) {
        return rxjs
            .from(inquirer.prompt(preguntaMenu))
            .pipe(map(// respuesta ant obs
        function (respuesta) {
            respuestaBDD.opcionMenu = respuesta;
            return respuestaBDD;
        }));
    });
}
function opcionesRespuesta() {
    return mergeMap(function (respuestaBDD) {
        var opcion = respuestaBDD.opcionMenu.opcionMenu;
        switch (opcion) {
            case 'Crear':
                return rxjs
                    .from(inquirer.prompt(preguntaCliente))
                    .pipe(map(function (cliente) {
                    respuestaBDD.cliente = cliente;
                    return respuestaBDD;
                }));
            case 'Buscar':
                return buscarClientePorNombre(respuestaBDD);
                break;
            case 'Actualizar':
                return preguntarIdCliente(respuestaBDD);
            case 'Borrar':
                return eliminarPorNombre(respuestaBDD);
                break;
        }
    });
}
function guardarBaseDeDatos() {
    return mergeMap(// Respuesta del anterior OBS
    function (respuestaBDD) {
        // console.log(respuestaBDD.bdd);
        return rxjs.from(guardarBDD(respuestaBDD.bdd));
    });
}
function ejecutarAcccion() {
    return map(// Respuesta del anterior OBS
    function (respuestaBDD) {
        var opcion = respuestaBDD.opcionMenu.opcionMenu;
        switch (opcion) {
            case 'Crear':
                var cliente = respuestaBDD.cliente;
                /*******************************************************************************>>>>>>>>>>*/
                // console.log(respuestaBDD.bdd.clientes);
                respuestaBDD.bdd.clientes.push(cliente);
                console.log('\n\tCliente registrado exitoxamente\n');
                return respuestaBDD;
            case 'Actualizar':
                var indice = respuestaBDD.indiceCliente;
                respuestaBDD.bdd.clientes[indice].nombre = respuestaBDD.cliente.nombre;
                console.log('\n\tCliente actualizado exitoxamente\n', respuestaBDD.bdd.clientes[indice].nombre);
                console.log('\n');
                return respuestaBDD;
            case 'Buscar':
                // console.log(respuestaBDD.bdd)
                console.log('\n\tCliente Encontrado:\n\t', respuestaBDD.cliente);
                console.log('\n');
                return respuestaBDD;
            case 'Borrar':
                console.log('\nCliente Eliminado correctamente:\n', respuestaBDD.bdd.clientes);
                console.log('\n');
                return respuestaBDD;
        }
    });
}
function preguntarIdCliente(respuestaBDD) {
    return rxjs
        .from(inquirer.prompt(preguntasActulizarCliente))
        .pipe(mergeMap(// RESP ANT OBS
    function (respuesta) {
        // console.log(respuesta);
        var indiceCliente = respuestaBDD.bdd
            .clientes
            .findIndex(// -1
        function (cliente) {
            // console.log(cliente);
            return cliente.id === respuesta.idCliente;
        });
        if (indiceCliente === -1) {
            console.log('El id no exista, Intente nuevamente \n');
            return preguntarIdCliente(respuestaBDD);
        }
        else {
            respuestaBDD.indiceCliente = indiceCliente;
            return rxjs
                .from(inquirer.prompt(preguntaActualizarCliente))
                .pipe(map(function (nombre) {
                respuestaBDD.cliente = {
                    id: null,
                    nombre: nombre.nombre
                };
                return respuestaBDD;
            }));
        }
    }));
}
function buscarClientePorNombre(respuestaBDD) {
    return rxjs
        .from(inquirer.prompt(preguntaBuscarNombreCliente))
        .pipe(mergeMap(// RESP ANT OBS
    function (respuesta) {
        var clienteEncontrado = respuestaBDD.bdd.clientes
            .find(function (cliente) {
            return cliente.nombre === respuesta.nombre;
        });
        respuestaBDD.cliente = clienteEncontrado;
        return rxjs.of(respuestaBDD);
    }));
}
function eliminarPorNombre(respuestaBDD) {
    return rxjs.from(inquirer.prompt(preguntaEliminarClientePorNombre))
        .pipe(mergeMap(function (respuesta) {
        var indiceDelNombre = respuestaBDD.bdd.clientes.findIndex(function (cliente) {
            return cliente.nombre === respuesta.nombre;
        });
        console.log(indiceDelNombre);
        var resultadoSplice = respuestaBDD.bdd.clientes.splice(indiceDelNombre, 1);
        return rxjs.of(respuestaBDD);
    }));
}
/*******************************************/
main();
