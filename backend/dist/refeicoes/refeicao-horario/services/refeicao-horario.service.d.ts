import { PrismaService } from 'src/prisma/prisma.service';
import { AppGateway } from 'src/app.gateway';
export interface IRefeicaoAtual {
    reho_id: number;
    reho_refe_id: number;
    reho_hora_inicio: Date;
    reho_hora_fim: Date;
    refe_id: number;
    refe_refeicao: string;
    refe_status: "0" | "1";
}
export declare class RefeicaoHorarioService {
    private prisma;
    private appGateway;
    constructor(prisma: PrismaService, appGateway: AppGateway);
    consultarHorario(): Promise<void>;
    pegarHorarios(): import(".prisma/client").Prisma.PrismaPromise<(import(".prisma/client").refeicao_horarios & {
        refeicao: import(".prisma/client").refeicao;
    })[]>;
    pegarHorariosPorRefeicao(refe_id: number): Promise<import(".prisma/client").refeicao_horarios[]>;
    pegarRefeicaoAtual(): Promise<IRefeicaoAtual>;
}
