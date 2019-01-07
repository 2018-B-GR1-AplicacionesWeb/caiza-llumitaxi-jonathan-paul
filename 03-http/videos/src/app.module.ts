import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {NoticiaService} from "./noticia/noticia.service";
import { TypeOrmModule } from '@nestjs/typeorm';
import {NoticiaEntity} from "./noticia/noticia-entity";
import {NoticiaModule} from "./noticia/noticia.module";

@Module({
        imports: [
            TypeOrmModule.forRoot({
                type: 'mysql',
                host: '192.168.99.100',
                port: 32771,
                username: 'jonathan',
                password: '12345678',
                database: 'web',
                synchronize: true,
                dropSchema: true,
                entities: [
                    NoticiaEntity
                ]
            }),
            NoticiaModule,
        ],  //Van los modulos
  controllers: [
      AppController
  ],  //Van los COntrollers
  providers: [
      AppService
  ],      // Van los Servicios
})
export class AppModule {}
