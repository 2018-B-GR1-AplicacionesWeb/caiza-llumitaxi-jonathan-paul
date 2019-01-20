import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {NoticiaService} from "./noticia/noticia.service";
import { TypeOrmModule } from '@nestjs/typeorm';
import {NoticiaEntity} from "./noticia/noticia.entity";
import {NoticiaModule} from "./noticia/noticia.module";
import {ArticuloEntity} from "./articulo/articulo.entity";
import {PaginaEntity} from "./pagina/pagina.entity";
import {UsuarioEntity} from "./usuario/usuario.entity";
import {UsuarioModule} from "./usuario/usuario.module";

@Module({
        imports: [
            TypeOrmModule.forRoot({
                type: 'mysql',
                host: '192.168.99.100',
                port: 32769,
                username: 'jonathan',
                password: '12345678',
                database: 'web',
                synchronize: true,
                dropSchema: false,
                entities: [
                    NoticiaEntity,
                    PaginaEntity,
                    ArticuloEntity,
                    UsuarioEntity
                ]
            }),
            NoticiaModule,
            UsuarioModule
        ],  //Van los modulos
  controllers: [
      AppController
  ],  //Van los COntrollers
  providers: [
      AppService
  ],      // Van los Servicios
})
export class AppModule {}


