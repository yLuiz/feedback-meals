import { RefeicaoAvaliacaoService } from '../services/refeicao_avaliacao.service';
export declare class RefeicaoAvaliacaoController {
    private refeicaoAvaliacaoService;
    constructor(refeicaoAvaliacaoService: RefeicaoAvaliacaoService);
    pegarTodasRefeicaoAvaliacao(): Promise<import(".prisma/client").refeicao_avaliacao[]>;
}
