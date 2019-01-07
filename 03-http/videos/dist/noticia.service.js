"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
let NoticiaService = class NoticiaService {
    constructor() {
        this.arreglo = [
            {
                id: 1,
                titulo: 'A',
                descripcion: 'Descripcion A'
            },
            {
                id: 2,
                titulo: 'B',
                descripcion: 'Descripcion B'
            },
            {
                id: 3,
                titulo: 'C',
                descripcion: 'Descripcion C'
            },
            {
                id: 4,
                titulo: 'D',
                descripcion: 'Descripcion D'
            }
        ];
        this.numeroRegistro = 5;
    }
    crear(noticia) {
        noticia.id = this.numeroRegistro;
        this.numeroRegistro++;
        this.arreglo.push(noticia);
        return noticia;
    }
    eliminar(idNoticia) {
        const indiceNoticia = this.arreglo
            .findIndex((noticia) => {
            return noticia.id == idNoticia;
        });
        const registroEliminado = JSON.parse(JSON.stringify(this.arreglo[indiceNoticia]));
        this.arreglo.splice(indiceNoticia, 1);
        return registroEliminado;
    }
    actulizar(idNoticia, nuevaNoticia) {
        const indiceNoticia = this.arreglo
            .findIndex((noticia) => {
            return noticia.id == idNoticia;
        });
        this.arreglo[indiceNoticia] = nuevaNoticia;
        return this.arreglo[indiceNoticia];
    }
    buscarPorId(idNoticia) {
        const indiceNoticia = this.arreglo
            .findIndex((noticia) => {
            return noticia.id === idNoticia;
        });
        return this.arreglo[indiceNoticia];
    }
};
NoticiaService = __decorate([
    common_1.Injectable()
], NoticiaService);
exports.NoticiaService = NoticiaService;
//# sourceMappingURL=noticia.service.js.map