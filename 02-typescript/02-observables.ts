// 02-observables.ts
// import { PaqueteUno, Paquete dos} from 'rxjs';
// import * as rxjs from 'rxjs';
// import {Observable} from "rxjs";

declare var require: any;
// declare var module:any;

const rxjs = require('rxjs');
const map = require('rxjs/operators').map;
const disctinct = require('rxjs/operators').distinct;

//const observableUno= rxjs.of (1,2,3,4,5);
const observableUno = rxjs.of(
    [1, 2, 3],
    3,
    'Hola',
    3,
    true,
    3,
    {nombre: 'Adrian'},
    new Date(),
    3,
);

console.log(observableUno);

//para transpilar >tsc 02-observables.ts --target  es2017
observableUno
    .pipe(
        disctinct(),
        map(
            (valor) => {
                console.log('Valor', valor);
                return {
                    data: valor
                };
            }
        )
    )
    .pipe(

    )
    .pipe(

    )
    .subscribe(
        (ok) => {
            console.log('En ok', ok);
        },
        (error) => {
            console.log(error);
        },
        () => {
            console.log('Completado');
        }
    );


const promesita = () => {
    // @ts-ignore
    return new Promise(
        (resolve, reject) => {
            reject(':)');
        }
    )
};
const observableDePromesa$ = rxjs.from(promesita());
/*
observableDePromesa$
    .pipe(
        map(
            (valor) => {
                return {
                    data: valor
                }
            }
        )
    )
    .subscribe(
        (objetoFeliz) => {
            console.log(objetoFeliz);
        },
        (error) => {
            console.log(error);
        }
    );
*/

async function ejecutarCodigoSyncrono(){
    console.log('Inicio');
    try{
        const resultadoPromesita = await promesita();
        console.log(resultadoPromesita);
    }catch (e) {
        console.log('Error en promesita',e);
    }
    console.log('Fin');
}

ejecutarCodigoSyncrono();

