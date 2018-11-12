import { AppService } from './app.service';
import { Observable } from "rxjs";
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    raiz(todoslosQueryParams: any, nombre: string): string;
    parametroRuta(id: any): any;
    adiosMundo(): string;
    adiosMundoPromesa(): Promise<string>;
    adiosMundoPromesaA(): Promise<string>;
    adiosMundoPObservable(): Observable<string>;
    adiosMundoPOST(): string;
}
