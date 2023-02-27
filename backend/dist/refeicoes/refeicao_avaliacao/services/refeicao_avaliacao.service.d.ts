import { PrismaService } from '../../../prisma/prisma.service';
export declare class RefeicaoAvaliacaoService {
    private prisma;
    constructor(prisma: PrismaService);
    pegarTodas(): Promise<import(".prisma/client").refeicao_avaliacao[]>;
}
