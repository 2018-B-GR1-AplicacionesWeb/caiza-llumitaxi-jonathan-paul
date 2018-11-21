import { AppService } from './app.service';
import { Observable } from "rxjs";
import { Request, Response } from 'express';
export declare class AppController {
    private readonly _servicio;
    constructor(_servicio: AppService);
    raiz(todoslosQueryParams: any, nombre: string): string;
    parametroRuta(id: any): any;
    adiosMundo(): string;
    adiosMundoPromesa(): Promise<string>;
    adiosMundoPromesaA(): Promise<string>;
    adiosMundoPObservable(): Observable<string>;
    crearUsuario(usuario: Usuario, nombre: string, cabeceras: any, codigo: any, res: Response, req: Request | any): void;
}
export interface Usuario {
    nombre: string;
}
