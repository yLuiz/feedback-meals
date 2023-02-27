import { RefeicaoService } from '../services/refeicao.service';
export declare class RefeicaoController {
    private refeicaoService;
    constructor(refeicaoService: RefeicaoService);
    pegarTodasRefeicoes(): Promise<import(".prisma/client").refeicao[]>;
}
