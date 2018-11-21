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
const app_service_1 = require("./app.service");
const rxjs_1 = require("rxjs");
let AppController = class AppController {
    constructor(_servicio) {
        this._servicio = _servicio;
    }
    raiz(todoslosQueryParams, nombre) {
        console.log(todoslosQueryParams);
        return 'Hola Mundo ' + nombre;
    }
    parametroRuta(id) {
        return id;
    }
    adiosMundo() {
        return 'Adios Mundo';
    }
    adiosMundoPromesa() {
        const promessaAdios = () => {
            return new Promise((resolve, reject) => {
                reject('Adios Mundo Promesa');
            });
        };
        return promessaAdios();
    }
    adiosMundoPromesaA() {
        return __awaiter(this, void 0, void 0, function* () {
            const promessaAdios = () => {
                return new Promise((resolve) => {
                    resolve('Adios Mundo Promesa');
                });
            };
            try {
                const respuesta = yield promessaAdios();
                return respuesta;
            }
            catch (e) {
                console.error(e);
                throw new common_1.InternalServerErrorException({ mensaje: 'error del servidor' });
            }
        });
    }
    adiosMundoPObservable() {
        const respuestaa = rxjs_1.of('AdiosMundo');
        return respuestaa;
    }
    crearUsuario(usuario, nombre, cabeceras, codigo, res, req) {
        console.log('Cookies: ', req.cookies);
        console.log('Cookies: ', req.secret);
        console.log('Cookies Seguras: ', req.signedCookies);
        console.log(usuario);
        if (codigo === '1234') {
            const bdd = this._servicio.crearUsuario(usuario);
            res.append('token', '5678');
            res.cookie('app', 'web');
            res.cookie('segura', 'secreto', {
                signed: true
            });
            res.json(bdd);
        }
        else {
            throw new common_1.UnauthorizedException({
                mensaje: 'Error de autorizacion',
                error: 401
            });
        }
    }
};
__decorate([
    common_1.Get(),
    __param(0, common_1.Query()),
    __param(1, common_1.Query('nombre')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", String)
], AppController.prototype, "raiz", null);
__decorate([
    common_1.Get('segmentoUno/segmentoDos/:idUsuario'),
    __param(0, common_1.Param('idUsuario')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "parametroRuta", null);
__decorate([
    common_1.Get('adiosMundo'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "adiosMundo", null);
__decorate([
    common_1.Get('adiosMundoPromesa'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "adiosMundoPromesa", null);
__decorate([
    common_1.Get('adiosMundoAsync'),
    common_1.HttpCode(201),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "adiosMundoPromesaA", null);
__decorate([
    common_1.Get('adiosMundoObservable'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", rxjs_1.Observable)
], AppController.prototype, "adiosMundoPObservable", null);
__decorate([
    common_1.Post('crearUsuario'),
    common_1.HttpCode(201),
    __param(0, common_1.Body()),
    __param(1, common_1.Body('nombre')),
    __param(2, common_1.Headers()),
    __param(3, common_1.Headers('seguridad')),
    __param(4, common_1.Res()),
    __param(5, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object, Object, Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "crearUsuario", null);
AppController = __decorate([
    common_1.Controller(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map