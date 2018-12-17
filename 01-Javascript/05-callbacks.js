const  fs = require('fs');
const contenidoAAgregar = 'Jonathan\n';
const nombreArchivo = '05-texto.txt';
console.log('Inicio');

fs.readFile(nombreArchivo,'utf-8',
    (error, contenidoArchivo) =>{ //Callback

        // fs.writeFile(nombreArchivo, contenidoArchivo + contenidoAAgregar, (err) => {
        //     if(err) throw err
        //     console.log('Se logro agregar')
        // });

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
            fs.writeFile(nombreArchivo, contenidoArchivo + contenidoAAgregar, (err) => {
                if(err) throw err
                console.log('Se logro agregar')
            });
        }
    });

// fs.writeFile(nombreArchivo, contenidoAAgregar, (err) => {
//     if(err) throw err
//     console.log('Se logro agregar')
// });


console.log('Fin');




