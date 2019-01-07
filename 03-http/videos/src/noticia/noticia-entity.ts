// conectarse a una base de datos que ya existe
//      el debe estar synchronize:false

// conectarse a una base de datos que no existe
//      el debe estar synchronize:true
//

import {Column, Entity, Index, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
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
        type: 'text',
        nullable: true
    })
    descripcion:String;

}