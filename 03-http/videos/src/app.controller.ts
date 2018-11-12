import {Get, Controller, InternalServerErrorException, HttpCode, Post, Query, Param} from '@nestjs/common';
import { AppService } from './app.service';
import {Observable, of} from "rxjs";

@Controller()   //decoradores -- una funcion antes de lo q sea ponga despues
export class AppController { // Export en otros archivos importar a esta clase
  constructor(private readonly appService: AppService) {}

  // @Get()
  // root(): string { // el nombre q se le de al metodo no importa

  @Get() // lo que acepta como parametro es la URL --> http://ip:puerto/url
  // @HttpCode(204) // lo que acepta como parametro es la URL --> http://ip:puerto/url
  raiz(
      // nombre:string
      @Query()todoslosQueryParams:any,
      @Query('nombre')nombre:string,
  ): string {
    // return this.appService.root();
      console.log(todoslosQueryParams);
      return 'Hola Mundo '+nombre;
  }

    @Get('segmentoUno/segmentoDos/:idUsuario') // url
    parametroRuta(@Param('idUsuario')id) {
        // return this.appService.root();
        return id
    }


  @Get('adiosMundo') // url
  adiosMundo(): string {
    // return this.appService.root();
      return 'Adios Mundo'
  }

  @Get('adiosMundoPromesa') // url
  adiosMundoPromesa(): Promise<string> {
      const promessaAdios = (): Promise<string> =>{
        return new Promise(
            (resolve, reject) =>{
               reject('Adios Mundo Promesa');
            }
        )
      };
      return promessaAdios();
  }

    @Get('adiosMundoAsync') // url
    @HttpCode(201)
    async adiosMundoPromesaA(): Promise<string> {
        const promessaAdios = (): Promise<string> =>{
            return new Promise(
                (resolve) =>{
                    resolve('Adios Mundo Promesa');
                }
            )
        };
        try {
            const  respuesta = await promessaAdios();
            return respuesta;
        }catch (e) {
            console.error(e);
            throw new InternalServerErrorException({mensaje: 'error del servidor'});
        }
    }

    @Get('adiosMundoObservable')
    adiosMundoPObservable(): Observable<string> {
        const respuestaa = of('AdiosMundo');
        return respuestaa;
    }

    @Post('adiosMundoPost')
    adiosMundoPOST(): string {
        return 'Adios Mundo Post';
    }
}
