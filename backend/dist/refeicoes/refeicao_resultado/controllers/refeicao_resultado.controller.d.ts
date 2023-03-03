import { RefeicaoResultadoService } from '../services/refeicao_resultado.service';
export declare class RefeicaoResultadoController {
    private refeicaoResultadoService;
    constructor(refeicaoResultadoService: RefeicaoResultadoService);
    pegarTodasRefeicaoResultado(): Promise<import(".prisma/client").refeicao_resultado[]>;
    pegarDetalhesRefeicaoResultado(): Promise<{
        refeicao: string;
        avaliacao: string;
        motivo: import(".prisma/client").refeicao_avaliacao_motivo[];
    }[]>;
    pegarTodasAvaliacoesPorRefeicao(refe_id: number): Promise<import(".prisma/client").refeicao_resultado[]>;
    cadastrarRefeicaoResultado(body: {
        refe_id: number;
        reav_id: number;
        reho_id: number;
    }): Promise<{
        rere_id: number;
        rere_data_registro: Date;
    }>;
}
