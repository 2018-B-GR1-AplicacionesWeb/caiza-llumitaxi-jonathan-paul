"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const noticia_service_1 = require("./noticia.service");
const typeorm_1 = require("typeorm");
let NoticiaController = class NoticiaController {
    constructor(_noticiaService) {
        this._noticiaService = _noticiaService;
    }
    inicio(response, busqueda, accion, titulo, text) {
        return __awaiter(this, void 0, void 0, function* () {
            let mensaje = undefined;
            if (accion && titulo) {
                switch (accion) {
                    case 'borrar':
                        mensaje = `Registro ${titulo} eliminado`;
                    case 'actualizar':
                        mensaje = `Registro ${titulo} actualizado`;
                    case 'crear':
                        mensaje = `Registro ${titulo} creado`;
                    case 'buscar':
                        mensaje = `Registro ${titulo} creado`;
                }
            }
            console.log(text);
            let noticias;
            if (busqueda) {
                const consulta = {
                    where: [
                        {
                            titulo: typeorm_1.Like(`%${busqueda}%`)
                        },
                        {
                            descripcion: typeorm_1.Like(`%${busqueda}%`)
                        }
                    ]
                };
                noticias = yield yield this._noticiaService.buscar(consulta);
            }
            else {
                noticias = yield this._noticiaService.buscar();
            }
            response.render('inicio', {
                usuario: 'Jonathan',
                arreglo: noticias,
                booleano: false,
                mensaje: mensaje
            });
        });
    }
    inicioPOST(response, text) {
        console.log(text);
    }
    eliminar(response, ideNoticia) {
        return __awaiter(this, void 0, void 0, function* () {
            const noticia = yield this._noticiaService.buscarPorId(+ideNoticia);
            yield this._noticiaService.eliminar(Number(ideNoticia));
            const parametroConsulta = `?accion=borrar&titulo=${noticia.titulo}`;
            response.redirect('/noticia/inicio' + parametroConsulta);
        });
    }
    crearNoticia(response) {
        response.render('crear-noticia');
    }
    crearNoticiaFuncion(response, noticia) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._noticiaService.crear(noticia);
            response.redirect('/noticia/inicio');
        });
    }
    actualizarNoticiaVista(response, idNoticia) {
        return __awaiter(this, void 0, void 0, function* () {
            const noticiaEncontrada = yield this._noticiaService
                .buscarPorId(+idNoticia);
            response.render('crear-noticia', {
                noticia: noticiaEncontrada
            });
        });
    }
    actualizarNoticiaMetodo(response, idNoticia, noticia) {
        return __awaiter(this, void 0, void 0, function* () {
            noticia.id = +idNoticia;
            yield this._noticiaService.actulizar(noticia);
            response.redirect('/noticia/inicio');
        });
    }
};
__decorate([
    common_1.Get('inicio'),
    __param(0, common_1.Res()),
    __param(1, common_1.Query('busqueda')),
    __param(2, common_1.Query('accion')),
    __param(3, common_1.Query('titulo')),
    __param(4, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String, Object]),
    __metadata("design:returntype", Promise)
], NoticiaController.prototype, "inicio", null);
__decorate([
    common_1.Get('inicio'),
    __param(0, common_1.Res()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], NoticiaController.prototype, "inicioPOST", null);
__decorate([
    common_1.Post('eliminar/:idNoticia'),
    __param(0, common_1.Res()),
    __param(1, common_1.Param('idNoticia')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], NoticiaController.prototype, "eliminar", null);
__decorate([
    common_1.Get('crear-noticia'),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], NoticiaController.prototype, "crearNoticia", null);
__decorate([
    common_1.Post('crear-noticia'),
    __param(0, common_1.Res()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], NoticiaController.prototype, "crearNoticiaFuncion", null);
__decorate([
    common_1.Get('actualizar-noticia/:idNoticia'),
    __param(0, common_1.Res()),
    __param(1, common_1.Param('idNoticia')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], NoticiaController.prototype, "actualizarNoticiaVista", null);
__decorate([
    common_1.Post('actualizar-noticia/:idNoticia'),
    __param(0, common_1.Res()),
    __param(1, common_1.Param('idNoticia')),
    __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], NoticiaController.prototype, "actualizarNoticiaMetodo", null);
NoticiaController = __decorate([
    common_1.Controller('noticia'),
    __metadata("design:paramtypes", [noticia_service_1.NoticiaService])
], NoticiaController);
exports.NoticiaController = NoticiaController;
//# sourceMappingURL=noticia.controller.js.map