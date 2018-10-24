const  fs = require('fs');
const contenidoAAgregar = 'Jonathan\n';
const nombreArchivo = '05-texto.txt';
console.log('Inicio');

fs.readFile('04-operadores.js','utf-8',
    (error, contenidoArchivo) =>{ //Callback
    if(error) {
        console.error(error);
        try {
            throw new   Error (error);
        }catch (e) {
            console.log(e);
        }
        console.log('Extra');
    }else{
        console.log('Si sirvio', contenidoArchivo);
    }
});

console.log('Fin');




