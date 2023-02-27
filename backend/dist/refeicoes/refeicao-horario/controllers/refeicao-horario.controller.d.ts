import { RefeicaoHorarioService } from '../services/refeicao-horario.service';
export declare class RefeicaoHorarioController {
    private refeicaoHorarioService;
    constructor(refeicaoHorarioService: RefeicaoHorarioService);
    pegarRefeicaoHorarios(): import(".prisma/client").Prisma.PrismaPromise<(import(".prisma/client").refeicao_horarios & {
        refeicao: import(".prisma/client").refeicao;
    })[]>;
    pegarRefeicaoAtual(): import(".prisma/client").Prisma.PrismaPromise<unknown>;
}
