//06-callback-propio.js

const  fs = require('fs');
/*
function appendFile(nombreArchivo, contenidoArchivo, callback) {

    //1ero leer si existe el archivo
    // Si existe leer el contenido
    //Sobre escribir el archivo con el contenido nuevo
    //mas el contenido antiguo

    fs.readFile(nombreArchivo, 'utf-8',
        (error, contenidoArchivoLeido) =>{
            if(error){
                fs.writeFile(nombreArchivo, contenidoArchivo, (err) => {
                    if(err){
                        console.error('Error escribiendo');
                        callback(undefined, 'Error escribiendo');
                    }else {
                        console.log('Archivo creado');
                        callback(contenidoArchivo);
                    }
                });
            }else{
                fs.writeFile(
                    nombreArchivo,
                    contenidoArchivoLeido + contenidoArchivo, (err) => {
                    if(err){
                        console.error('Error escribiendo');
                        //return 'ERROR'
                    }else {
                        console.log('Archivo creado');
                        callback( contenidoArchivoLeido + contenidoArchivo);
                    }
                });
            }
        }
    );
}

appendFile('06-texto.txt','\n Adios Mundo',
    (contenidoArchivo, error) => {  //Callback
        if(error){
            console.log(error);
        }else{
            console.log(contenidoArchivo);
        }
    }
);

//console.log(resultadoAppendFile);

//['A','B'.'C']
//0-A     'A'
//1-B     'B'
//2-C     'C'

const respuesta = {
    nombreArchivo :'',
    contenidoArchivo :'',
    erroe : ''
};*/

function ejercicioDeArchivos(arregloString, callback) {
    const arregloRespuestas = [];
    arregloString
        .forEach(
            (string, indice)=>{
                const archivo = `${indice} - ${string}.txt`;
                const contenido = string;
                fs.writeFile(archivo,
                    contenido,
                    (error) => {
                        const respuesta = {
                            nombreArchivo :archivo,
                            contenidoArchivo :contenido,
                            erroe : error
                        };
                        arregloRespuestas.push(respuesta);
                        const tamañoRespuesta = arregloRespuestas.length;

                        if (tamañoRespuesta === arregloString.length){
                            //console.log(arregloRespuestas);
                            callback(arregloRespuestas);
                        }
                    }
                );
            }
        )
}

const arregloStrings =['A','B','C'];

ejercicioDeArchivos(arregloStrings,
    (arregloRespuestas) => {
        console.log(arregloRespuestas);
    }
);

