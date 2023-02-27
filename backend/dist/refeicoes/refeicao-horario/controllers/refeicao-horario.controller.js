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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefeicaoHorarioController = void 0;
const common_1 = require("@nestjs/common");
const refeicao_horario_service_1 = require("../services/refeicao-horario.service");
let RefeicaoHorarioController = class RefeicaoHorarioController {
    constructor(refeicaoHorarioService) {
        this.refeicaoHorarioService = refeicaoHorarioService;
    }
    pegarRefeicaoHorarios() {
        return this.refeicaoHorarioService.pegarHorarios();
    }
    pegarRefeicaoAtual() {
        return this.refeicaoHorarioService.pegarRefeicaoAtual();
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RefeicaoHorarioController.prototype, "pegarRefeicaoHorarios", null);
__decorate([
    (0, common_1.Get)('atual'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RefeicaoHorarioController.prototype, "pegarRefeicaoAtual", null);
RefeicaoHorarioController = __decorate([
    (0, common_1.Controller)('refeicao-horario'),
    __metadata("design:paramtypes", [refeicao_horario_service_1.RefeicaoHorarioService])
], RefeicaoHorarioController);
exports.RefeicaoHorarioController = RefeicaoHorarioController;
//# sourceMappingURL=refeicao-horario.controller.js.map