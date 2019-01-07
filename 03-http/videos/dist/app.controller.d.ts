import { AppService } from './app.service';
import { NoticiaService } from "./noticia/noticia.service";
export declare class AppController {
    private readonly _servicio;
    private readonly _noticiaService;
    constructor(_servicio: AppService, _noticiaService: NoticiaService);
}
export interface Usuario {
    nombre: string;
}
export interface Noticia {
    id?: number;
    titulo: string;
    descripcion: string;
}
