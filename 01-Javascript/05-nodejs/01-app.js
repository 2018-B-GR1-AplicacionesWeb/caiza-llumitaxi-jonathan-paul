const calculadora = require('./02-calculadora.js');
const util = require('../05-nodejs-02/01-util.js');
const tiempo = require('./tiempo/01-tiempo');

const fs = require('fs');
const expressjs = require ('express');

console.log('calculadora ',calculadora.nombreCalculadora);
console.log('calculadora ',calculadora.sumarDosNumeros(1,2));
console.log('calculadora ',tiempo);

console.log('fs',fs);
console.log('express',expressjs);

console.log(util);



