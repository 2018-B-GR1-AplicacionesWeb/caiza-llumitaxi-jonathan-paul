import {tiposPeliculas} from "../Proyecto/opcionesMenu";

declare var require;
declare var Promise;
const inquirer = require('inquirer');
const fs = require('fs');
const rxjs = require('rxjs');
const timer = require('rxjs').timer;
const mergeMap = require('rxjs/operators').mergeMap;
const map = require('rxjs/operators').map;

////////////////////////////////////////////////////////RECURSOS///////////////////////////////////////
const nombreDelArchivo = 'bdd.json';

const preguntaMenu = {
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
const preguntasActulizarCliente = [
    {
        type: 'input',
        name: 'idCliente',
        message: 'Ingrese ID Cliente: ',
    }
];

const preguntaEliminarClientePorNombre = [
    {
        type: 'input',
        name: 'nombre',
        message: '¿Cuál es el cliente que quiere eliminar? ',
    }
];

const preguntaBuscarNombreCliente = [
    {
        type: 'input',
        name: 'nombre',
        message: 'Ingrese nombre del Cliente a Buscar: ',
    }
];

const preguntaCliente = [
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

const preguntaActualizarCliente = [
    {
        type: 'input',
        name: 'nombre',
        message: 'Ingrese nombre del cliente: '
    },
];

/**********************Preguntas Pelicula*******************************/
const preguntaActualizarPelicula = [
    { type: 'input', name: 'precioPelicula', message: 'Ingrese el precio de la pelicula:' },
    { type: 'list', name: 'tipoPelicula', message: 'Escoga la categoria:', choices: tiposPeliculas },
    { type: 'input', name: 'actorPrincipal', message: 'Ingrese nombre del actor principal:'},
    { type: 'input', name: 'añoLanzamiento', message: 'Ingrese el año de lanzamiento'},
];

const preguntasRegistroPelicula = [
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

const preguntaEliminarPelicula = [
    { type: 'input', name: 'nombrePelicula', message: '¿Qué Pelicula desea borrar?' }];

const preguntaBuscarPelicula = [
    { type: 'input', name: 'nombrePelicula', message: '¿Qué pelicula desea buscar?' }];


/*************************** Base de Datos ***************************/
function inicialiarBDD() {
    return new Promise(
        (resolve, reject) => {
            fs.readFile(
                nombreDelArchivo,
                'utf-8',
                (error, contenidoArchivo) => { // CALLBACK
                    if (error) {
                        fs.writeFile(
                            nombreDelArchivo,
                            '{"clientes":[],"peliculas":[]}',
                            (error) => {
                                if (error) {
                                    reject({
                                        mensaje: 'ERROR AL CREAR BASE',
                                        error: 500
                                    })
                                } else {
                                    resolve({
                                        mensaje: 'BDD LEÍDA',
                                        bdd: JSON.parse('{"clientes":[],"peliculas":[]}')
                                    })
                                }

                            }
                        )

                    } else {
                        resolve({
                            mensaje: 'BDD LEÍDA',
                            bdd: JSON.parse(contenidoArchivo)
                        })
                    }
                }
            )
        }
    );
}

/***************************** OperacionesCRUD **************************/

function main() {
    const respuestaBDD$ = rxjs.from(inicialiarBDD());
    respuestaBDD$
        .pipe(
            preguntarOpcionesMenu(),
            opcionesRespuesta(),
            ejecutarAcccion(),
            guardarBaseDeDatos()
        )
        .subscribe(
            (data) => {
                // console.log(data);
            },
            (error) => {
                console.log(error);
            },
            () => {
                main();
                // console.log('Complete');
            }
        )
}

function guardarBDD(bdd: BDD) {
    return new Promise(
        (resolve, reject) => {
            fs.writeFile(
                nombreDelArchivo,
                JSON.stringify(bdd),
                (error) => {
                    if (error) {
                        reject({
                            mensaje: 'Error creando',
                            error: 500
                        })
                    } else {
                        resolve({
                            mensaje: 'BDD guardada',
                            bdd: bdd
                        })
                    }

                }
            )
        }
    )
}

function preguntarOpcionesMenu() {
    return mergeMap( // Respuesta Anterior Observable
        (respuestaBDD: RespuestaBDD) => {
            return rxjs
                .from(inquirer.prompt(preguntaMenu))
                .pipe(
                    map( // respuesta ant obs
                        (respuesta: OpcionMenu) => {
                            respuestaBDD.opcionMenu = respuesta;
                            return respuestaBDD
                        }
                    )
                );
        }
    )
}






function opcionesRespuesta() {
    return mergeMap(
        (respuestaBDD: RespuestaBDD) => {
            const opcion = respuestaBDD.opcionMenu.opcionMenu;
            switch (opcion) {
                case 'Crear':
                    return rxjs
                        .from(inquirer.prompt(preguntaCliente))
                        .pipe(
                            map(
                                (cliente: Cliente) => { // resp ant OBS
                                    respuestaBDD.cliente = cliente;
                                    return respuestaBDD;
                                }
                            )
                        );
                case 'Buscar':
                    return buscarClientePorNombre(respuestaBDD);
                    break;
                case 'Actualizar':
                    return preguntarIdCliente(respuestaBDD);
                case 'Borrar':
                    return eliminarPorNombre(respuestaBDD);
                    break;
            }
        }
    )
}

function guardarBaseDeDatos() {
    return mergeMap(// Respuesta del anterior OBS
        (respuestaBDD: RespuestaBDD) => {
            // console.log(respuestaBDD.bdd);
            return rxjs.from(guardarBDD(respuestaBDD.bdd))
        }
    )
}

function ejecutarAcccion() {
    return map( // Respuesta del anterior OBS
        (respuestaBDD: RespuestaBDD) => {
            const opcion = respuestaBDD.opcionMenu.opcionMenu;
            switch (opcion) {
                case 'Crear':
                    const cliente:Cliente = respuestaBDD.cliente;
                    /*******************************************************************************>>>>>>>>>>*/
                    // console.log(respuestaBDD.bdd.clientes);
                    respuestaBDD.bdd.clientes.push(cliente);
                    console.log('\n\tCliente registrado exitoxamente\n')
                    return respuestaBDD;
                case 'Actualizar':
                    const indice = respuestaBDD.indiceCliente;
                    respuestaBDD.bdd.clientes[indice].nombre = respuestaBDD.cliente.nombre;
                    console.log('\n\tCliente actualizado exitoxamente\n', respuestaBDD.bdd.clientes[indice].nombre)
                    console.log('\n');
                    return respuestaBDD;
                case 'Buscar':
                    // console.log(respuestaBDD.bdd)
                    console.log('\n\tCliente Encontrado:\n\t',respuestaBDD.cliente);
                    console.log('\n');
                    return respuestaBDD;
                case 'Borrar':
                    console.log('\nCliente Eliminado correctamente:\n', respuestaBDD.bdd.clientes);
                    console.log('\n');
                    return respuestaBDD;
            }
        }
    )
}

function preguntarIdCliente(respuestaBDD: RespuestaBDD) {
    return rxjs
        .from(inquirer.prompt(preguntasActulizarCliente))
        .pipe(
            mergeMap( // RESP ANT OBS
                (respuesta: BuscarClientePorId) => {
                    // console.log(respuesta);
                    const indiceCliente = respuestaBDD.bdd
                        .clientes
                        .findIndex( // -1
                            (cliente: Cliente) => {
                                // console.log(cliente);
                                return cliente.id === respuesta.idCliente
                            }
                        );
                    if (indiceCliente === -1) {
                        console.log('El id no exista, Intente nuevamente \n');
                        return preguntarIdCliente(respuestaBDD);
                    } else {
                        respuestaBDD.indiceCliente = indiceCliente;
                        return rxjs
                            .from(inquirer.prompt(preguntaActualizarCliente))
                            .pipe(
                                map(
                                    (nombre:{nombre:string})=>{
                                        respuestaBDD.cliente ={
                                            id:null,
                                            nombre:nombre.nombre
                                        };
                                        return respuestaBDD;
                                    }
                                )
                            );
                    }
                }
            )
        );
}

function buscarClientePorNombre(respuestaBDD: RespuestaBDD) {
    return rxjs
        .from(inquirer.prompt(preguntaBuscarNombreCliente))
        .pipe(
            mergeMap( // RESP ANT OBS
                (respuesta: BuscarClientePorNombre) => {
                    const clienteEncontrado = respuestaBDD.bdd.clientes
                        .find(
                            (cliente)=>{
                                return cliente.nombre === respuesta.nombre;
                            }
                        )
                    respuestaBDD.cliente = clienteEncontrado;
                    return rxjs.of(respuestaBDD);
                }
            )
        );
}

function eliminarPorNombre(respuestaBDD: RespuestaBDD) {
    return rxjs.from(inquirer.prompt(preguntaEliminarClientePorNombre))
        .pipe(
            mergeMap(
                (respuesta: EliminarClientePorNombre)=>{
                    const indiceDelNombre = respuestaBDD.bdd.clientes.findIndex((cliente)=>{
                        return cliente.nombre === respuesta.nombre;
                    });
                    console.log(indiceDelNombre)
                    const resultadoSplice = respuestaBDD.bdd.clientes.splice(indiceDelNombre,1);
                    return rxjs.of(respuestaBDD);
                }
            )
        )

}

/************************** Interfaces ******************************/
interface RespuestaBDD {
    mensaje: string;
    bdd: BDD;
    opcionMenu?: OpcionMenu;
    cliente?: Cliente;
    indiceCliente: number;
}

interface BDD {
    clientes: Cliente[] | any;
    peliculas: Pelicula[];
}

interface Cliente {
    id: number;
    nombre: string;
}

interface Pelicula {
    idPelicula:number,
    nombrePelicula:string,
    tipoPelicula:string,
    actorPrincipal:string,
    añoLanzamiento:number,
    precioPelicula:string,
    idCliente:number
}
interface OpcionMenu {
    opcionMenu: 'Crear' | 'Borrar' | 'Buscar' | 'Actualizar';
}

interface BuscarClientePorId {
    idCliente: number;
}

interface BuscarClientePorNombre {
    nombre: string;
}

interface EliminarClientePorNombre {
    nombre: string;
}

/*******************************************/

main();
