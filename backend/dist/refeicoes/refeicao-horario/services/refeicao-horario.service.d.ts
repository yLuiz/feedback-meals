import { PrismaService } from 'src/prisma/prisma.service';
export declare class RefeicaoHorarioService {
    private prisma;
    constructor(prisma: PrismaService);
    pegarHorarios(): import(".prisma/client").Prisma.PrismaPromise<(import(".prisma/client").refeicao_horarios & {
        refeicao: import(".prisma/client").refeicao;
    })[]>;
    pegarRefeicaoAtual(): import(".prisma/client").Prisma.PrismaPromise<unknown>;
}
