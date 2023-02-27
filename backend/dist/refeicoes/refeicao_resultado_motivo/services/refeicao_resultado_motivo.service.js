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
const prisma_service_1 = require("../../../prisma/prisma.service");
let RefeicaoResultadoMotivoService = class RefeicaoResultadoMotivoService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async cadastrarMotivoAvaliacao(motivos) {
        const motivosRegistrados = await this.prisma.refeicao_resultado_motivo.createMany({
            data: [...motivos]
        });
        return motivosRegistrados;
    }
    pegarMotivos() {
        return this.prisma.refeicao_resultado_motivo.findMany();
    }
};
RefeicaoResultadoMotivoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RefeicaoResultadoMotivoService);
exports.RefeicaoResultadoMotivoService = RefeicaoResultadoMotivoService;
//# sourceMappingURL=refeicao_resultado_motivo.service.js.map