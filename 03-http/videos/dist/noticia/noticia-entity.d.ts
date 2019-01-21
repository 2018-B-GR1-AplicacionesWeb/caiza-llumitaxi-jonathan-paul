import { PaginaEntity } from "../pagina/pagina.entity";
export declare class NoticiaEntity {
    id: number;
    titulo: String;
    descripcion: String;
    paginas: PaginaEntity[];
    primerConsole(): void;
    segundoConsole(): void;
}
