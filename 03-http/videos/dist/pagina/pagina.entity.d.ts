import { NoticiaEntity } from "../noticia/noticia.entity";
import { ArticuloEntity } from "../articulo/articulo.entity";
export declare class PaginaEntity {
    id: number;
    numero: number;
    noticias: NoticiaEntity[];
    articulos: ArticuloEntity;
}
