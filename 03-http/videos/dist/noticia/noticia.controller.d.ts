import { Noticia } from "../app.controller";
import { NoticiaService } from "./noticia.service";
export declare class NoticiaController {
    private readonly _noticiaService;
    constructor(_noticiaService: NoticiaService);
    inicio(response: any, accion: string, titulo: string, text: any): Promise<void>;
    inicioPOST(response: any, text: any): void;
    eliminar(response: any, ideNoticia: string): void;
    crearNoticia(response: any): void;
    crearNoticiaFuncion(response: any, noticia: Noticia): Promise<void>;
    actualizarNoticiaVista(response: any, idNoticia: string): void;
    actualizarNoticiaMetodo(response: any, idNoticia: string, noticia: Noticia): void;
}
export interface Noticia {
    id?: number;
    titulo: string;
    descripcion: string;
}
