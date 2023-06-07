import { AppGateway } from 'src/app.gateway';
import { ICadastroMotivo } from 'src/interfaces/ICadastroMotivo';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class RefeicaoResultadoMotivoService {
    private prisma;
    private appGateway;
    constructor(prisma: PrismaService, appGateway: AppGateway);
    cadastrarMotivoAvaliacao(motivos: ICadastroMotivo[]): Promise<{
        message: string;
    }>;
    pegarMotivos(): import(".prisma/client").Prisma.PrismaPromise<import(".prisma/client").refeicao_resultado_motivo[]>;
}
