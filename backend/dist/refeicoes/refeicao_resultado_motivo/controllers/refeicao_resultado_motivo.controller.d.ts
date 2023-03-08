import { ICadastroMotivo } from 'src/interfaces/ICadastroMotivo';
import { RefeicaoResultadoMotivoService } from '../services/refeicao_resultado_motivo.service';
export declare class RefeicaoResultadoMotivoController {
    private refeicaoResultadoMotivoService;
    constructor(refeicaoResultadoMotivoService: RefeicaoResultadoMotivoService);
    pegarMotivosAvaliacao(): import(".prisma/client").Prisma.PrismaPromise<import(".prisma/client").refeicao_resultado_motivo[]>;
    cadastrarMotivoAvaliacao(body: {
        motivos: ICadastroMotivo[];
    }): Promise<{
        message: string;
    }>;
}
