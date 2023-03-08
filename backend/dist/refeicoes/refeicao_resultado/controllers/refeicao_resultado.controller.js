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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefeicaoResultadoController = void 0;
const common_1 = require("@nestjs/common");
const refeicao_resultado_service_1 = require("../services/refeicao_resultado.service");
let RefeicaoResultadoController = class RefeicaoResultadoController {
    constructor(refeicaoResultadoService) {
        this.refeicaoResultadoService = refeicaoResultadoService;
    }
    pegarTodasRefeicaoResultado() {
        return this.refeicaoResultadoService.pegarTodas();
    }
    pegarDetalhesRefeicaoResultado() {
        return this.refeicaoResultadoService.pegarDetalhesRefeicaoResultado();
    }
    pegarAvaliacaoPorDataEHora(query) {
        const { data, horario_id: horarioId } = query;
        return this.refeicaoResultadoService.pegarAvaliacaoPorDataEHora(data, horarioId);
    }
    pegarTodasAvaliacoesPorRefeicao(refe_id) {
        return this.refeicaoResultadoService.pegarAvaliacoesPorRefeicao(Number(refe_id));
    }
    cadastrarRefeicaoResultado(body) {
        const { refe_id, reav_id, reho_id } = body;
        return this.refeicaoResultadoService.cadastrarAvaliacao(refe_id, reav_id, reho_id);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RefeicaoResultadoController.prototype, "pegarTodasRefeicaoResultado", null);
__decorate([
    (0, common_1.Get)('detalhes'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RefeicaoResultadoController.prototype, "pegarDetalhesRefeicaoResultado", null);
__decorate([
    (0, common_1.Get)('motivos'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], RefeicaoResultadoController.prototype, "pegarAvaliacaoPorDataEHora", null);
__decorate([
    (0, common_1.Get)(':refe_id'),
    __param(0, (0, common_1.Param)('refe_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], RefeicaoResultadoController.prototype, "pegarTodasAvaliacoesPorRefeicao", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], RefeicaoResultadoController.prototype, "cadastrarRefeicaoResultado", null);
RefeicaoResultadoController = __decorate([
    (0, common_1.Controller)('refeicao-resultado'),
    __metadata("design:paramtypes", [refeicao_resultado_service_1.RefeicaoResultadoService])
], RefeicaoResultadoController);
exports.RefeicaoResultadoController = RefeicaoResultadoController;
//# sourceMappingURL=refeicao_resultado.controller.js.map