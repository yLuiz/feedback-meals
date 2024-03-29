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
exports.RefeicaoHorarioService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
const schedule_1 = require("@nestjs/schedule");
const app_gateway_1 = require("../../../app.gateway");
const IRefeicao_1 = require("../../../interfaces/IRefeicao");
let RefeicaoHorarioService = class RefeicaoHorarioService {
    constructor(prisma, appGateway) {
        this.prisma = prisma;
        this.appGateway = appGateway;
        this.logger = new common_1.Logger();
    }
    async consultarHorario() {
        let refeicaoAtual = await this.pegarRefeicaoAtual();
        if (!refeicaoAtual) {
            this.appGateway.emitMudarRefeicao('aguardando', 0);
            this.appGateway.refeicao = 'aguardando';
            return;
        }
        ;
        const refeicao = refeicaoAtual.refe_refeicao.split('/')[0];
        refeicaoAtual.refe_refeicao = refeicao;
        this.appGateway.ultimaRefeicao = {
            horarioId: refeicaoAtual.reho_id,
            id: refeicaoAtual.refe_id,
            nome: IRefeicao_1.refeicaoOpcoes[refeicao]
        };
        this.appGateway.emitMudarRefeicao(refeicaoAtual.refe_refeicao, refeicaoAtual.reho_id);
        this.appGateway.refeicao = refeicaoAtual.refe_refeicao;
    }
    ;
    pegarHorarios() {
        return this.prisma.refeicao_horarios.findMany({
            include: {
                refeicao: true
            }
        });
    }
    async pegarHorariosPorRefeicao(refe_id) {
        if (!refe_id) {
            return [];
        }
        return await this.prisma.refeicao_horarios.findMany({
            where: {
                reho_refe_id: refe_id
            }
        });
    }
    async pegarRefeicaoAtual() {
        const query = await this.prisma.$queryRaw `
      SELECT *
      FROM refeicao_horarios as reho
      INNER JOIN refeicao ON refeicao.refe_id = reho.reho_refe_id
      WHERE 
      TIME(NOW()) BETWEEN reho_hora_inicio AND reho_hora_fim`;
        return query[0];
    }
};
__decorate([
    (0, schedule_1.Cron)('*/5 * * * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RefeicaoHorarioService.prototype, "consultarHorario", null);
RefeicaoHorarioService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => app_gateway_1.AppGateway))),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        app_gateway_1.AppGateway])
], RefeicaoHorarioService);
exports.RefeicaoHorarioService = RefeicaoHorarioService;
//# sourceMappingURL=refeicao-horario.service.js.map