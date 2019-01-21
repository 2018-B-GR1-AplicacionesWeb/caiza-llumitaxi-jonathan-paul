import { Noticia } from "./app.controller";
export declare class NoticiaService {
    arreglo: Noticia[];
    numeroRegistro: number;
    crear(noticia: Noticia): Noticia;
    eliminar(idNoticia: number): Noticia;
    actulizar(idNoticia: number, nuevaNoticia: Noticia): Noticia;
    buscarPorId(idNoticia: number): Noticia;
}
