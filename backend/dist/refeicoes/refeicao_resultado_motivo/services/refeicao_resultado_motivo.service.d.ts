import { ICadastroMotivo } from 'src/interfaces/ICadastroMotivo';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class RefeicaoResultadoMotivoService {
    private prisma;
    constructor(prisma: PrismaService);
    cadastrarMotivoAvaliacao(motivos: ICadastroMotivo[]): Promise<import(".prisma/client").Prisma.BatchPayload>;
    pegarMotivos(): import(".prisma/client").Prisma.PrismaPromise<import(".prisma/client").refeicao_resultado_motivo[]>;
}
