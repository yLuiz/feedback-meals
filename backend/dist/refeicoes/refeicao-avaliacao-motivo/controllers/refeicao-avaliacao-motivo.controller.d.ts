import { RefeicaoAvaliacaoMotivoService } from '../services/refeicao-avaliacao-motivo.service';
export declare class RefeicaoAvaliacaoMotivoController {
    private refeicaoAvaliacaoMotivoService;
    constructor(refeicaoAvaliacaoMotivoService: RefeicaoAvaliacaoMotivoService);
    pegarAvaliacaoMotivos(): import(".prisma/client").Prisma.PrismaPromise<import(".prisma/client").refeicao_avaliacao_motivo[]>;
}
