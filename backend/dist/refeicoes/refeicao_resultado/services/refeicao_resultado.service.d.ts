import { AppGateway } from 'src/app.gateway';
import { PrismaService } from '../../../prisma/prisma.service';
export declare class RefeicaoResultadoService {
    private prisma;
    private AppGateway;
    constructor(prisma: PrismaService, AppGateway: AppGateway);
    pegarTodas(): Promise<import(".prisma/client").refeicao_resultado[]>;
    cadastrarAvaliacao(refe_id: number, reav_id: number, reho_id: number): Promise<{
        rere_id: number;
        rere_data_registro: Date;
    }>;
    pegarAvaliacoesPorRefeicao(refe_id: number): Promise<import(".prisma/client").refeicao_resultado[]>;
    pegarDetalhesRefeicaoResultado(): Promise<{
        refeicao: string;
        avaliacao: string;
        motivo: import(".prisma/client").refeicao_avaliacao_motivo[];
    }[]>;
}
