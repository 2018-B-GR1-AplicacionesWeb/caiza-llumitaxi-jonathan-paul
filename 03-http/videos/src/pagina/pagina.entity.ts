//pagina.etity.ts

import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {NoticiaEntity} from "../noticia/noticia.entity";
import {ArticuloEntity} from "../articulo/articulo.entity";

@Entity('pagina')
export class PaginaEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    numero:number;

    @ManyToOne(
        type => NoticiaEntity,  //Tipo de tabla
        noticia => noticia.paginas
    )
    noticias: NoticiaEntity[];

    @OneToMany(
        type => ArticuloEntity,
        articulo => articulo.pagina
    )
    articulos: ArticuloEntity;
}

