import {Module} from "@nestjs/common";
import {UsuarioService} from "./usuario.service";
import {NoticiaEntity} from "../noticia/noticia.entity";
import { TypeOrmModule } from '@nestjs/typeorm';
import {UsuarioEntity} from "./usuario.entity";

@Module({
    imports:[
        TypeOrmModule.forFeature(
            [
                UsuarioEntity
            ]
        )
    ],
    providers:[
        UsuarioService
    ],
    exports:[
        UsuarioService
    ]
})

export  class UsuarioModule {
}
