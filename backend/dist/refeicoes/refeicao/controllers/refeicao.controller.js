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
exports.RefeicaoController = void 0;
const common_1 = require("@nestjs/common");
const refeicao_service_1 = require("../services/refeicao.service");
let RefeicaoController = class RefeicaoController {
    constructor(refeicaoService) {
        this.refeicaoService = refeicaoService;
    }
    pegarTodasRefeicoes() {
        return this.refeicaoService.pegarTodas();
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RefeicaoController.prototype, "pegarTodasRefeicoes", null);
RefeicaoController = __decorate([
    (0, common_1.Controller)('refeicao'),
    __metadata("design:paramtypes", [refeicao_service_1.RefeicaoService])
], RefeicaoController);
exports.RefeicaoController = RefeicaoController;
//# sourceMappingURL=refeicao.controller.js.map