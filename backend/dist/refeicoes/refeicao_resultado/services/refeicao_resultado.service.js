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
exports.RefeicaoResultadoService = void 0;
const common_1 = require("@nestjs/common");
const app_gateway_1 = require("../../../app.gateway");
const prisma_service_1 = require("../../../prisma/prisma.service");
let RefeicaoResultadoService = class RefeicaoResultadoService {
    constructor(prisma, appGateway) {
        this.prisma = prisma;
        this.appGateway = appGateway;
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
            }
        });
        this.appGateway.atualizarValorGrafico(refe_id, reav_id);
        return { rere_id: refeicao_resultado.rere_id, rere_data_registro: refeicao_resultado.rere_data_registro };
    }
    async pegarAvaliacoesPorRefeicao(reho_id) {
        if (!reho_id)
            throw new common_1.HttpException({ message: 'Id do horário da refeição é necessário.' }, common_1.HttpStatus.UNPROCESSABLE_ENTITY);
        const avaliacoes = await this.prisma.refeicao_resultado.findMany({
            where: {
                rere_reho_id: reho_id,
            },
        });
        return avaliacoes.filter(avaliacao => {
            const avaliacao_data = avaliacao.rere_data_registro;
            const dia = new Date().getDate();
            const mes = new Date().getMonth();
            const ano = new Date().getFullYear();
            const datasIguais = avaliacao_data.getDate() === dia && avaliacao_data.getMonth() === mes && avaliacao_data.getFullYear() === ano;
            if (datasIguais)
                return avaliacao;
        });
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
    async pegarAvaliacaoPorDataEHora(date, reho_id) {
        if (!date || !reho_id)
            throw new common_1.HttpException({
                message: "É necessário informar a data e horário."
            }, common_1.HttpStatus.UNPROCESSABLE_ENTITY);
        function zeroSuffix(numero, tamanho) {
            let numeroString = numero.toString();
            while (numeroString.length < tamanho)
                numeroString = "0" + numeroString;
            return numeroString;
        }
        const dia = zeroSuffix(new Date().getDate(), 2);
        const mes = zeroSuffix(new Date().getMonth() + 1, 2);
        const ano = zeroSuffix(new Date().getFullYear(), 2);
        const data = `${ano}-${mes}-${dia}`;
        return this.prisma.$queryRaw `
      SELECT rere.rere_id, rere.rere_reho_id, reav.reav_tipo, ream.ream_id, ream.ream_motivo FROM refeicao_resultado rere
      INNER JOIN refeicao_avaliacao reav ON reav.reav_id = rere.rere_reav_id
      INNER JOIN refeicao_resultado_motivo rerm ON rere.rere_id = rerm.rerm_rere_id
      INNER JOIN refeicao_avaliacao_motivo ream ON rerm.rerm_ream_id = ream.ream_id
      WHERE DATE(rere_data_registro) = ${data} AND rere.rere_reho_id = ${reho_id}
      ORDER BY ream_motivo
    `;
    }
};
RefeicaoResultadoService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => app_gateway_1.AppGateway))),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        app_gateway_1.AppGateway])
], RefeicaoResultadoService);
exports.RefeicaoResultadoService = RefeicaoResultadoService;
//# sourceMappingURL=refeicao_resultado.service.js.map