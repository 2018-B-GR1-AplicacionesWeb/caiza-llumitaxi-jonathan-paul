// import {paqueteUno, paqueteDos from 'rxjs';
//import * as rxjs from 'rxjs';
//import {Observable} from "rxjs";

declare var require;
//declare var module:any;

const rxjs = require('rxjs');
const observableUno= rxjs.of (1,2,3,4,5);

console.log(observableUno);

//para transpijar >tsc 02-observables.ts --target  es2017

observableUno.
    subscribe(
        (ok) => {
            console.log(ok);
        },
        (error) =>{
            console.log(error);
        },
        ()=>{
            console.log('Completado')
        }
);
