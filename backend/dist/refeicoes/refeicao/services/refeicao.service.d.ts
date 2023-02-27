import { PrismaService } from 'src/prisma/prisma.service';
export declare class RefeicaoService {
    private prisma;
    constructor(prisma: PrismaService);
    pegarTodas(): Promise<import(".prisma/client").refeicao[]>;
}
