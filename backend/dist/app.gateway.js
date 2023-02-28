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
exports.AppGateway = void 0;
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const corsOrigins = ["http://147.1.0.84", "http://147.1.40.158", "http://147.1.0.85"];
const options = {
    cors: {
        origin: corsOrigins,
        methods: ["GET"],
        credentials: true,
        allowHeaders: ["my-header-custom"]
    }
};
let AppGateway = class AppGateway {
    constructor() {
        this.refeicaoAtual = 'aguardando';
        this.logger = new common_1.Logger('AppGateway');
    }
    set refeicao(value) {
        this.refeicaoAtual = value;
    }
    get refeicao() {
        return this.refeicaoAtual;
    }
    mudarRefeicao(client, payload) {
        this.refeicaoAtual = payload.refeicao;
        this.server.emit('pegarRefeicao', { refeicao: this.refeicaoAtual, horarioId: payload.horarioId });
    }
    emitMudarRefeicao(refeicao, horarioId) {
        this.server.emit('pegarRefeicao', { refeicao, horarioId });
    }
    atualizarValorGrafico(refe_id, reav_id) {
        this.server.emit('atualizarValorGrafico', {
            refe_id,
            reav_id,
        });
    }
    afterInit(server) {
        this.logger.log("Init");
    }
    emitPegarRefeicao() {
        this.server.emit('pegarRefeicao', { refeicao: this.refeicaoAtual });
    }
    handleConnection(client, ...args) {
        this.emitPegarRefeicao();
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
AppGateway = __decorate([
    (0, websockets_1.WebSocketGateway)(options),
    __metadata("design:paramtypes", [])
], AppGateway);
exports.AppGateway = AppGateway;
//# sourceMappingURL=app.gateway.js.map