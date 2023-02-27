"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("./prisma/prisma.service");
const refeicao_service_1 = require("./refeicoes/refeicao/services/refeicao.service");
const refeicao_controller_1 = require("./refeicoes/refeicao/controllers/refeicao.controller");
const refeicao_avaliacao_service_1 = require("./refeicoes/refeicao_avaliacao/services/refeicao_avaliacao.service");
const refeicao_avaliacao_controller_1 = require("./refeicoes/refeicao_avaliacao/controllers/refeicao_avaliacao.controller");
const refeicao_resultado_service_1 = require("./refeicoes/refeicao_resultado/services/refeicao_resultado.service");
const refeicao_resultado_controller_1 = require("./refeicoes/refeicao_resultado/controllers/refeicao_resultado.controller");
const app_gateway_1 = require("./app.gateway");
const refeicao_resultado_motivo_controller_1 = require("./refeicoes/refeicao_resultado_motivo/controllers/refeicao_resultado_motivo.controller");
const refeicao_resultado_motivo_service_1 = require("./refeicoes/refeicao_resultado_motivo/services/refeicao_resultado_motivo.service");
const refeicao_avaliacao_motivo_service_1 = require("./refeicoes/refeicao-avaliacao-motivo/services/refeicao-avaliacao-motivo.service");
const refeicao_avaliacao_motivo_controller_1 = require("./refeicoes/refeicao-avaliacao-motivo/controllers/refeicao-avaliacao-motivo.controller");
const refeicao_horario_service_1 = require("./refeicoes/refeicao-horario/services/refeicao-horario.service");
const refeicao_horario_controller_1 = require("./refeicoes/refeicao-horario/controllers/refeicao-horario.controller");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [app_gateway_1.AppGateway],
        controllers: [refeicao_controller_1.RefeicaoController, refeicao_avaliacao_controller_1.RefeicaoAvaliacaoController, refeicao_resultado_controller_1.RefeicaoResultadoController, refeicao_resultado_motivo_controller_1.RefeicaoResultadoMotivoController, refeicao_avaliacao_motivo_controller_1.RefeicaoAvaliacaoMotivoController, refeicao_horario_controller_1.RefeicaoHorarioController],
        providers: [prisma_service_1.PrismaService, refeicao_service_1.RefeicaoService, refeicao_avaliacao_service_1.RefeicaoAvaliacaoService, refeicao_resultado_service_1.RefeicaoResultadoService, app_gateway_1.AppGateway, refeicao_resultado_motivo_service_1.RefeicaoResultadoMotivoService, refeicao_avaliacao_motivo_service_1.RefeicaoAvaliacaoMotivoService, refeicao_horario_service_1.RefeicaoHorarioService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map