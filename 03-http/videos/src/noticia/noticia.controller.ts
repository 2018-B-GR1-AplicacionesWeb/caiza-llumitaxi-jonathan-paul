//noticia.controller.ts
import {BadRequestException, Body, Controller, Get, Param, Post, Query, Res} from "@nestjs/common";
import {Noticia} from "../app.controller";
import {NoticiaService} from "./noticia.service";
import {__await} from "tslib";
import {NoticiaEntity} from "./noticia.entity";
import {FindManyOptions, Like} from "typeorm";
import {CreateNoticiaDto} from "./dto/create-noticia.dto";
import {validate, ValidationError} from "class-validator";

@Controller('noticia')
export class NoticiaController{

    constructor(private readonly _noticiaService: NoticiaService) {

    }

    @Get('inicio')
    async inicio(
        @Res() response,
        @Query('busqueda') busqueda:string,
        @Query('accion') accion:string,
        @Query('titulo') titulo: string,
        @Body() text
    ) {
        let mensaje = undefined;
        let clase = undefined;
        if(accion && titulo){
            switch (accion) {
                case 'borrar':
                    mensaje = `Registro ${titulo} eliminado`;
                    clase = 'alert alert-danger';
                    break;
                case 'actualizar':
                    mensaje = `Registro ${titulo} actualizado`;
                    clase = 'alert alert-info';
                    break;
                case 'crear':
                    mensaje = `Registro ${titulo} creado`;
                    clase = 'alert alert-success';
                    break;

            }

        }
        console.log(text);

        // const noticias = await this._noticiaService.buscar();

        let noticias: NoticiaEntity[];
        if (busqueda){
            const consulta: FindManyOptions<NoticiaEntity> = {
                where: [
                {
                    titulo: Like(`%${busqueda}%`)
                },
                {
                    descripcion: Like(`%${busqueda}%`)
                }
            ]};
            noticias = await await this._noticiaService.buscar(consulta);
        } else {
            noticias = await this._noticiaService.buscar()
        }

        response.render(
            'inicio',
            {
                usuario:'Jonathan',
                arreglo: noticias,
                booleano: false,
                mensaje: mensaje,
                clase: clase
            }
        );
    }

    @Get('inicio')
    inicioPOST(
        @Res() response,
        @Body() text
    ) {

        console.log(text)

    }

    @Post('eliminar/:idNoticia')
    async eliminar(
        @Res() response,
        @Param('idNoticia') ideNoticia:string,
    ){
        const noticia = await this._noticiaService.buscarPorId(+ideNoticia);
        await this._noticiaService.eliminar(Number(ideNoticia));
        const parametroConsulta = `?accion=borrar&titulo=${noticia.titulo}`;
        response.redirect('/noticia/inicio'+parametroConsulta);
    }

    @Get('crear-noticia')
    crearNoticia(
        @Res() response,
    ){
        response.render(
            'crear-noticia'
        )
    }

    @Post('crear-noticia')
    async crearNoticiaFuncion(
        @Res() response,
        @Body() noticia:Noticia
    ){
        // const noticiaCreada = this._noticiaService.crear(noticia);
        const objetoValidacionNoticia = new CreateNoticiaDto();
        objetoValidacionNoticia.titulo = noticia.titulo;
        objetoValidacionNoticia.descripcion = noticia.descripcion;

        const errores: ValidationError[] = await validate(objetoValidacionNoticia);

        const hayErrores = errores.length>0;

        if(hayErrores){
            console.error(errores);
            //redirect crear noticia
            //en crear noticias deberia mostrar mensajes
            //como en la pantalla de iNICIO
            throw new BadRequestException({
                mensaje: 'Error de validacion'
            })
        }else {
            await this._noticiaService.crear(noticia);
            const parametroConsulta = `?accion=crear&titulo=${noticia.titulo}`;
            response.redirect('/noticia/inicio' + parametroConsulta);
            // response.redirect(
            //     '/inicio'
            // )
        }
    }

    @Get('actualizar-noticia/:idNoticia')
    async actualizarNoticiaVista(
        @Res() response,
        @Param('idNoticia') idNoticia: string
    ){
        //El "+" le transforma en numero a un string
        //Numerico
        // const noticiaEncontrada = this._noticiaService.buscarPorId(+idNoticia)
        const noticiaEncontrada = await this._noticiaService
            .buscarPorId(+idNoticia);
        response.render(
            'crear-noticia',
            {
                noticia: noticiaEncontrada
            }
        )
    }

    @Post('actualizar-noticia/:idNoticia')
    async actualizarNoticiaMetodo(
        @Res() response,
        @Param('idNoticia') idNoticia: string,
        @Body () noticia: Noticia
    ) {
        noticia.id = +idNoticia
        // const noticiaActualizada = this._noticiaService.actulizar(+idNoticia, noticia);
        // const parametroConsulta = `?accion=actualizar&titulo=${noticiaActualizada.titulo}`;
        await this._noticiaService.actulizar(noticia);
        const parametrosConsulta = `?accion=actualizar&titulo=${noticia.titulo}`
        response.redirect('/noticia/inicio' + parametrosConsulta);
        // response.redirect(
        //     '/inicio'
        // )
    }
}

export interface Noticia {
    id?: number,
    titulo:string;
    descripcion:string;
}
