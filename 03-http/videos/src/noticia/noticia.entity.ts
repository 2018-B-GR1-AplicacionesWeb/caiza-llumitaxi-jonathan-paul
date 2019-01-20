// conectarse a una base de datos que ya existe
//      el debe estar synchronize:false

// conectarse a una base de datos que no existe
//      el debe estar synchronize:true
//

import {BeforeInsert, Column, Entity, Index, OneToMany, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import {PaginaEntity} from "../pagina/pagina.entity";
@Entity('noticia') //Es buena practica poner explicitamente el nombre de la tabla que queremos
export class NoticiaEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Column({
        name: 'titulo_noticia',
        type: 'varchar',
        length: 50
    })
    titulo:String;

    @Column({
        name: 'descripcion_noticia',
        type: 'varchar',
        nullable: true
    })
    descripcion:String;

    @OneToMany(
        type => PaginaEntity,   //Que tabla vamos a relacionar
        pagina => pagina.noticias //Campo que hace referencia como el Foreing key
    )
    paginas: PaginaEntity[];

    @BeforeInsert()
    primerConsole(){
        console.log(`Esta es el primer console`)
    }

    @BeforeInsert()
    segundoConsole(){
        console.log(`El titulo es ${this.titulo}`);
    }
}