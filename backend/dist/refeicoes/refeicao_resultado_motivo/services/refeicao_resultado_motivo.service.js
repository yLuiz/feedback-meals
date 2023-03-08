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
exports.RefeicaoResultadoMotivoService = void 0;
const common_1 = require("@nestjs/common");
const app_gateway_1 = require("../../../app.gateway");
const prisma_service_1 = require("../../../prisma/prisma.service");
let RefeicaoResultadoMotivoService = class RefeicaoResultadoMotivoService {
    constructor(prisma, appGateway) {
        this.prisma = prisma;
        this.appGateway = appGateway;
    }
    async cadastrarMotivoAvaliacao(motivos) {
        await this.prisma.refeicao_resultado_motivo.createMany({
            data: [...motivos]
        });
        this.appGateway.atualizarValorGraficoMotivos();
        return {
            message: "Motivos registrados."
        };
    }
    pegarMotivos() {
        return this.prisma.refeicao_resultado_motivo.findMany();
    }
};
RefeicaoResultadoMotivoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        app_gateway_1.AppGateway])
], RefeicaoResultadoMotivoService);
exports.RefeicaoResultadoMotivoService = RefeicaoResultadoMotivoService;
//# sourceMappingURL=refeicao_resultado_motivo.service.js.map