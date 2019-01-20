import { AppService } from './app.service';
import { NoticiaService } from "./noticia/noticia.service";
import { UsuarioService } from "./usuario/usuario.service";
export declare class AppController {
    private readonly _servicio;
    private readonly _noticiaService;
    private readonly _usuarioService;
    constructor(_servicio: AppService, _noticiaService: NoticiaService, _usuarioService: UsuarioService);
    mostrarLogin(res: any): void;
    ejecutarLogin(username: string, password: string, res: any, sesion: any): Promise<void>;
    logout(res: any, sesion: any): void;
}
export interface Usuario {
    nombre: string;
}
export interface Noticia {
    id?: number;
    titulo: string;
    descripcion: string;
}
