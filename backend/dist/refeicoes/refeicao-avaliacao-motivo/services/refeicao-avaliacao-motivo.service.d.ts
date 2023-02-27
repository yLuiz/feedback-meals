import { PrismaService } from 'src/prisma/prisma.service';
export declare class RefeicaoAvaliacaoMotivoService {
    private prisma;
    constructor(prisma: PrismaService);
    pegarAvaliacaoMotivos(): import(".prisma/client").Prisma.PrismaPromise<import(".prisma/client").refeicao_avaliacao_motivo[]>;
}
