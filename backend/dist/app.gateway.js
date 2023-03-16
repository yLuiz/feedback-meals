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
exports.AppGateway = void 0;
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const IRefeicao_1 = require("./interfaces/IRefeicao");
const refeicao_horario_service_1 = require("./refeicoes/refeicao-horario/services/refeicao-horario.service");
const refeicao_resultado_service_1 = require("./refeicoes/refeicao_resultado/services/refeicao_resultado.service");
const corsOrigins = ["http://localhost:3002", "http://147.1.5.47:3002"];
const options = {
    cors: {
        origin: corsOrigins,
        methods: ["GET"],
        credentials: true,
        allowHeaders: ["my-header-custom"]
    }
};
let AppGateway = class AppGateway {
    constructor(refeicaoHorarioService, refeicaoResultadoService) {
        this.refeicaoHorarioService = refeicaoHorarioService;
        this.refeicaoResultadoService = refeicaoResultadoService;
        this.refeicaoAtual = 'aguardando';
        this.ultimaRefeicaoVariavel = {
            horarioId: 1,
            id: 1,
            nome: IRefeicao_1.refeicaoOpcoes['desjejum']
        };
        this.logger = new common_1.Logger('AppGateway');
    }
    set refeicao(value) {
        this.refeicaoAtual = value;
    }
    get refeicao() {
        return this.refeicaoAtual;
    }
    set ultimaRefeicao(value) {
        this.ultimaRefeicaoVariavel = value;
    }
    get ultimaRefeicao() {
        return this.ultimaRefeicaoVariavel;
    }
    mudarRefeicao(client, payload) {
        this.refeicaoAtual = payload.refeicao;
        if (payload.refeicao !== 'aguardando') {
            this.ultimaRefeicao = {
                horarioId: payload.horarioId,
                id: IRefeicao_1.refeicao[payload.refeicao],
                nome: IRefeicao_1.refeicaoOpcoes[payload.refeicao]
            };
        }
        this.emitMudarRefeicao(this.refeicaoAtual, payload.horarioId);
    }
    emitirRefeicao(client, payload) {
        this.refeicaoHorarioService.consultarHorario();
    }
    emitMudarRefeicao(refeicao, horarioId) {
        this.server.emit('pegarRefeicao', { refeicao, horarioId, ultimaRefeicao: this.ultimaRefeicao });
    }
    atualizarValorGrafico(refe_id, reav_id) {
        this.server.emit('atualizarValorGrafico', {
            refe_id,
            reav_id,
        });
    }
    async atualizarValorGraficoMotivos() {
        const motivos = await this.refeicaoResultadoService.pegarAvaliacaoPorDataEHora(new Date(), this.ultimaRefeicao.horarioId);
        this.server.emit('atualizarMotivos', { payload: motivos });
    }
    afterInit(server) {
        this.logger.log("Init");
    }
    handleConnection(client, ...args) {
        this.refeicaoHorarioService.consultarHorario();
        this.logger.log("Connected " + client.id);
    }
    handleDisconnect(client) {
        this.logger.log("Disconnected " + client.id);
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], AppGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('mudarRefeicao'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], AppGateway.prototype, "mudarRefeicao", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('pegarRefeicao'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], AppGateway.prototype, "emitirRefeicao", null);
AppGateway = __decorate([
    (0, websockets_1.WebSocketGateway)(options),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => refeicao_horario_service_1.RefeicaoHorarioService))),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => refeicao_resultado_service_1.RefeicaoResultadoService))),
    __metadata("design:paramtypes", [refeicao_horario_service_1.RefeicaoHorarioService,
        refeicao_resultado_service_1.RefeicaoResultadoService])
], AppGateway);
exports.AppGateway = AppGateway;
//# sourceMappingURL=app.gateway.js.map