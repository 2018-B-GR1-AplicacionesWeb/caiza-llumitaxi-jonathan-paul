import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {NoticiaEntity} from "../noticia/noticia.entity";
import {UsuarioEntity} from "./usuario.entity";
import {FindOneOptions, Repository} from "typeorm";

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(UsuarioEntity)
        private readonly _usuarioRepository:
            Repository<UsuarioEntity>

    ){
    }

    async autenticar(userName:string, password:string){
        //Password encriptada
        //Encriptar el password que les llega
        const consulta: FindOneOptions<UsuarioEntity> = {
            where:{
                username: userName,
                password: password //Password encriptado
            }
        };
        // console.log(userName + " "+ password)
        const respeusta = await this._usuarioRepository.findOne(consulta);
        if(respeusta){
            return true;
        }else {
            return false;
        }
    }
}