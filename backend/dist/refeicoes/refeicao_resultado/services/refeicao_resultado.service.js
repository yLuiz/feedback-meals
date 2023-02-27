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
exports.RefeicaoResultadoService = void 0;
const common_1 = require("@nestjs/common");
const app_gateway_1 = require("../../../app.gateway");
const prisma_service_1 = require("../../../prisma/prisma.service");
let RefeicaoResultadoService = class RefeicaoResultadoService {
    constructor(prisma, AppGateway) {
        this.prisma = prisma;
        this.AppGateway = AppGateway;
    }
    async pegarTodas() {
        return await this.prisma.refeicao_resultado.findMany();
    }
    async cadastrarAvaliacao(refe_id, reav_id, reho_id) {
        if (!refe_id)
            refe_id = 1;
        const refeicao_resultado = await this.prisma.refeicao_resultado.create({
            data: {
                rere_refe_id: refe_id,
                rere_reav_id: reav_id,
                rere_reho_id: reho_id,
                rere_data_registro: new Date()
            }
        });
        this.AppGateway.atualizarValorGrafico(refe_id, reav_id);
        return { rere_id: refeicao_resultado.rere_id };
    }
    async pegarAvaliacoesPorRefeicao(refe_id) {
        const avaliacoes = await this.prisma.refeicao_resultado.findMany({
            where: {
                rere_refe_id: refe_id,
            }
        });
        return avaliacoes.filter(avaliacao => avaliacao.rere_data_registro.getDate() === new Date().getDate());
    }
    async pegarDetalhesRefeicaoResultado() {
        const motivos = await this.prisma.refeicao_avaliacao_motivo.findMany();
        const resultados = await this.prisma.refeicao_resultado.findMany({
            include: {
                refeicao: true,
                refeicao_avaliacao: true,
                refeicao_resultado_motivo: true,
                refeicao_horarios: true
            }
        });
        let resultadosRetorno = resultados.map(resultado => {
            return {
                refeicao: resultado.refeicao.refe_refeicao,
                avaliacao: resultado.refeicao_avaliacao.reav_tipo,
                motivo: resultado.refeicao_resultado_motivo.map(resultado => {
                    return motivos.filter(motivo => resultado.rerm_ream_id === motivo.ream_id)[0];
                })
            };
        });
        return resultadosRetorno;
    }
};
RefeicaoResultadoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        app_gateway_1.AppGateway])
], RefeicaoResultadoService);
exports.RefeicaoResultadoService = RefeicaoResultadoService;
//# sourceMappingURL=refeicao_resultado.service.js.map