let inquirer = require('inquirer');
let readline = require('readline');
const  fs = require('fs');

const encabezadoApp = '\n ________________________________________________\n|'+
                      '\n|\t      VENTA DE PELICULAS                 |'+
                      '\n|________________________________________________|\n\n';

const menuPrincipal = encabezadoApp+
                      '\t(1)Adminstrador\n' +
                      '\t(2)Cliente\n' +
                      '\t(3)Salir\n'+
                      '\n ________________________________________________\n';

const menuAdministrador = encabezadoApp+
                          '\t(1)Registrar Peliculas\n' +
                          '\t(2)Eliminar Pelicula\n' +
                          '\t(3)Actualizar Pelicula\n'+
                          '\t(4)Salir\n'+
                          '\n ________________________________________________\n';


const menuCliente = encabezadoApp+
                    '\t(1)Mostrar Peliculas\n' +
                    '\t(2)Comprar Pelicula\n' +
                    '\t(3)Salir\n'+
                    '\n ________________________________________________\n';


const mensajeSalir = encabezadoApp+'\n\n\n\tFIN DE LA APLICACION';

let administrador={
    userId: 1,
    userName: 'jonathan',
    password: '12345'
}

let cliente={
    cleinteId:1,
    nombreCliente: 'Jonathan Caiza',
    cedula:'1712345678'
}

interface PeliculaInterface{
    idPelicula: number;
    nombrePelicula:string;
    añoLanzamiento?: number | string;
    actorePrincipal: string;
}

let peliculas: PeliculaInterface[]=[];

let preguntaPeliculas = [
    {
        type: 'input',
        name: 'idPelicula',
        message: '\n\tId de la pelicula: ',
        validate: function(value) {
            var valid = !isNaN(parseFloat(value));
            return valid || '\n \t\tIngrese un Id valido debe ser numero\n';
        },
        filter: Number
    },
    {
        type: 'input',
        name: 'nombrePelicula',
        message: "\n\tNombre de la Pelicula: ",
    },
    {
        type: 'input',
        name: 'añoLanzamiento',
        message: "\n\tAño de lanzamiento: ",
    },
    {
        type: 'input',
        name: 'actorePrincipal',
        message: "\n\tActor Principal: ",
    }
]

// console.log(menuPrincipal+'Seleccione una opcion: ');



let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question(menuPrincipal+'Seleccione una opcion: ', (respuesta) => {
    console.clear();
    switch (respuesta.toString().trim()) {
        case '1':
            console.clear();
            seleccionarOpcionAdministrador();
            //console.clear();
            break;
        case '2':
            console.clear();
            seleccionarOpcionCliente();
            break;
        case '3':
            console.clear();
            console.log(mensajeSalir+'\n');
            //rl.finish;
            rl.close();
            break;
        default:
            console.log('error');
            break;
    }

});

function seleccionarOpcionAdministrador (){
    console.clear();
    //let continuarCiclo = true;
    rl.question(menuAdministrador + 'Seleccione una opcion: ',
        (respuesta) => {
            switch (respuesta.toString().trim()) {
                case '1':
                    registrarPelicula();
                    break;
                case '2':
                    console.log(menuCliente);
                    break;
                case '3':
                    console.clear();
                    console.log(mensajeSalir + '\n');
                    rl.close();
                    // continuarCiclo = false;
                    break;
                default:
                    console.log('error');
                    break;
            }
        }
    )
}

function seleccionarOpcionCliente (){
    console.clear();
    //let continuarCiclo = true;
    rl.question(menuCliente + 'Seleccione una opcion: ',
        (respuesta) => {
            switch (respuesta.toString().trim()) {
                case '1':
                    mostrarPelicula();
                    break;
                case '2':
                    console.log(menuCliente);
                    break;
                case '3':
                    console.clear();
                    console.log(mensajeSalir + '\n');
                    rl.close();
                    // continuarCiclo = false;
                    break;
                default:
                    console.log('error');
                    break;
            }
        }
    )
}

function registrarPelicula() {
    console.clear();
    console.log('\n ________________________________________________');
    console.log('|                                                |');
    console.log('|\t      REGISTRO DE PELICULAS              |');
    console.log('|________________________________________________|');
    console.log('|                                                |');
    console.log('| Ingrese los datos de la pelicula:              |');
    console.log('|________________________________________________|\n');
    inquirer.prompt(preguntaPeliculas).then(answers => {
        //peliculas.push(answers);
        //console.log(peliculas);

        guardarEnArchivo('peliculas.txt',answers)
            .then(
                (contenidoDelArchivo) => {
                    console.log('Todo bien', contenidoDelArchivo);
                }
            )
            .catch(
                (resultadoError) => {
                    console.log('Algo malo paso', resultadoError);
                }
            );

        console.log('\nDatos ingresados correctamente:');
        console.log('\n|________________________________________________|\n');
    });
}

function mostrarPelicula() {
    console.clear();
    console.log('\n ________________________________________________');
    console.log('|                                                |');
    console.log('|\t      LISTA DE PELICULAS                 |');
    console.log('|________________________________________________|');
    // console.log('|                                                |');
    // console.log('| Ingrese los datos de la pelicula:              |');
    // console.log('|________________________________________________|\n');

    leerArchivo('peliculas.txt')
        .then(
            (contenidoDelArchivo) => {
                //console.log('Peliculas: \n', contenidoDelArchivo);
                let arregloJson: PeliculaInterface[]=[];
                // let peliculas: PeliculaInterface[]=[];
                contenidoDelArchivo.split(/\r?\n/).map(function(linea){
                    //console.log(linea);
                    let arregloObtenido = linea;
                    arregloJson.push(JSON.parse(arregloObtenido));
                };
                 //arregloJson = JSON.stringify(arreglo);
                console.log(arregloJson.forEach(function(value, key) {
                    //console.log(key+'\n--'+value+'-----\n'+arreglo );
                    let valor:PeliculaInterface = value;
                    console.log(valor.nombrePelicula);
                    console.log((key+1)+
                        '\n\tIdPelicula: '+valor.idPelicula+
                        '\n\tNombre: '+valor.nombrePelicula+
                        '\n\tAño: '+valor.añoLanzamiento+
                        '\n\tActor: '+valor.actorePrincipal)
                }));
            }
        )
        .catch(
            (resultadoError) => {
                console.log('Algo malo paso\n\n', resultadoError);
            }
        );

    // let arreglo = texto.split(/\r?\n/).map(function(linea){
    //     return linea.split(' ');
    // };
    // var arregloJson = JSON.stringify(arreglo);
    console.log('\n|________________________________________________|\n');

}

/****************************************************************************/

const respuesta = {
    nombreArchivo :'',
    contenidoArchivo :'',
    erroe : ''
};

const guardarEnArchivo = (nombreArchivo,  pelicula)=>{
    return new Promise(
        (resolve, reject) => {
            fs.readFile(nombreArchivo, 'utf-8',
                (error, contenidoArchivoLeido) => {
                    if (error) {
                        fs.writeFile(nombreArchivo, JSON.stringify(pelicula)+'\n', (err) => {
                            if (err) {
                                console.error(pelicula);
                                //callback(undefined, 'Error escribiendo');
                                reject('Error escribiendo');
                            } else {
                                console.log('Archivo creado');
                                //callback(contenidoArchivo);
                                resolve(JSON.stringify(pelicula)+'\n');
                            }
                        });
                    } else {
                        fs.writeFile(
                            nombreArchivo,
                            contenidoArchivoLeido + JSON.stringify(pelicula)+'\n', (err) => {
                                if (err) {
                                    //console.error('Error escribiendo');
                                    reject('Error escribiendo');
                                    //return 'ERROR'
                                } else {
                                    // console.log(contenidoArchivo);
                                    //callback(contenidoArchivoLeido + contenidoArchivo);
                                    resolve(contenidoArchivoLeido+JSON.stringify(pelicula)+'\n')
                                }
                            }
                        );
                    }
                }
            );
        }
    )
}

function leerArchivo(nombreArchivo){
    return new Promise(
        (resolve, reject) => {
            fs.readFile(nombreArchivo, 'utf-8',
                (error, contenidoArchivoLeido) => {
                    if (error) {
                        reject('Error al leer');
                    } else {
                        resolve(contenidoArchivoLeido);
                    }
                }
            );
        }
    )
}























// function seleccionarOpcionMenuPrinciapl(respuesta:string) {
//     switch (respuesta.toString().trim()) {
//         case '1':
//             seleccionarOpcionAdministrador();
//             //console.clear();
//             break;
//         case '2':
//             //console.clear()
//             console.log(menuCliente);
//             break;
//         case '3':
//             console.clear();
//             console.log(mensajeSalir+'\n');
//             rl.finish;
//             break;
//         default:
//             console.log('error');
//             break;
//     }
// }

// let seleccionOpcionMenu = process.openStdin();

// seleccionOpcionMenu.addListener("data",
//     function(respuesta) {
//         console.clear();
//         switch (respuesta.toString().trim()) {
//             case '1':
//                 seleccionarOpcionAdministrador();
//                 //console.clear();
//                 break;
//             case '2':
//                 //console.clear()
//                 console.log(menuCliente);
//                 break;
//             case '3':
//                 console.clear();
//                 console.log(mensajeSalir);
//                 break;
//             default:
//                 console.log('error');
//                 break;
//         }
//     }
// );






//  let readline = require('readline');
//
// var rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });
//
// rl.question("What do you think of Node.js? ", function(answer) {
//     console.log("Thank you for your valuable feedback:", answer);
//     rl.close();
// });

// let rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });
//
// rl.question('Is this example useful? [y/n] ', (answer) => {
//     switch(answer.toLowerCase()) {
//         case 'y':
//             console.log('Super!');
//             break;
//         case 'n':
//             console.log('Sorry! :(');
//             break;
//         default:
//             console.log('Invalid answer!');
//     }
//     rl.close();
//     rl.finish();
// });




















//
// inquirer.prompt([
//     {
//         // type: "list",
//         // name: "opciones",
//         // message: "Selecciono: ?",
//         // choices: ['Administrador', 'Cliente', 'Salir']
//
//         type: 'list',
//         name: 'prize',
//         message: 'seleccionado ',
//         choices: ['A', 'B'],
//         when: function(answers) {
//             // if(answers.comments === 'A'){
//             //     console.log('Se escogio A')
//             // }else{
//             //     console.log('Se escogio B')
//             // }
//             return answers.comments !== 'Nope, all good!';
//         }
//     }
// ]).then(function(inqResp){
//     var activity = inqResp.choices;
//
//     if (activity === "Administrador"){
//         //createMenu();
//         console.log('Administrador escogido')
//     } else if (activity === "Cliente"){
//         //deleteMenu();
//         console.log('Cliente escogido')
//     } else if (activity === "Salir"){
//         //return 0;
//         console.log('Salir escogido')
//     }
// });
//


// // inquirer
// //     .prompt(
// //         console.log('Venta de pelicuas')
// //     )
// //     .then(answers => {
// //         console.log('them', answers)
// //     });
// //
// //
//
//
// console.log('Hi, welcome to Node Pizza');
//
// var questions = [
//     {
//         // type: 'list',
//         // name: '--- PelisStore ---',
//         // //message: '',
//         // choices: ['Administrador', 'Clientes', 'Salir'],
//         // // when: function(answers) {
//         // //     return answers.comments !== 'No, todo bien';
//         // // }
//
//         type: 'rawlist',
//         name: 'beverage',
//         message: ' ',
//         choices: ['Pepsi', '7up', 'Coke']
//     }
// ];
//
// inquirer.prompt(questions).then(answers => {
//    // console.log('\nOrder receipt:');
//     //console.log(JSON.stringify(answers, null, '  '));
//     let avar = JSON.stringify(answers, null, ' ');
//     console.log(avar.beverage)
// });
//
//
// // inquirer
// //     .prompt(
// //         questions
// //     )
// //     // .then(answers => {
// //     //     console.log('Algooo');
// //     // });
//
//
//
// /*
// interface UsuarioInterface {
//     nombre:string;
//     apellido:string;
//     edad ?: number | string;   // la incognita le dice al tranpilador '?' que etsa variable es opcional
// }
//
// class Usuario{
//     public nombre:string;
//     public apellido:string;
//     public edad ?: number | string;
// }
//
// function sumarDosNumeros(
//     numUno: number,
//     numDos: number) {
//     return numUno + numDos;
// };
// */