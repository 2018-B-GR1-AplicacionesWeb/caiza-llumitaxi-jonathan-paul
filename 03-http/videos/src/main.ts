import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {} from 'http-server'  //EN Typescript para importar
import * as cookieParser from 'cookie-parser'
import * as ejs from 'ejs';
import * as session from 'express-session';
import * as FileSession from 'session-file-store';
import * as express from 'express';
const FileStore = FileSession(session);

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.use(
        session({
            secret: 'No sera de tomar un tragito',
            sesave: false,
            saveUninitialixed: true,
            cookie: {
                secure:false
            },
            name:'server-session-id',
            store: new FileStore()
        })
    );

    app.use(cookieParser(
        'me gustan los tacos', // secreto
        {  // opciones

        }
    ));
    app.set('view engine', 'ejs');

    app.use(
      express.static('publico')
    );

    // /public/texto.txt
    // localhost:3000/texto.txt

    // /public/ejemplo/texto.txt
    // localhost:3000/ejemplo/texto.txt

    await app.listen(3000);

}
bootstrap();
