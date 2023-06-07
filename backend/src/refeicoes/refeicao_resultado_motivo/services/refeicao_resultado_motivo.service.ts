import { Injectable } from '@nestjs/common';
import { AppGateway } from 'src/app.gateway';
import { ICadastroMotivo } from 'src/interfaces/ICadastroMotivo';
import { PrismaService } from 'src/prisma/prisma.service';
import { RefeicaoResultadoService } from 'src/refeicoes/refeicao_resultado/services/refeicao_resultado.service';
import { adicionarZeroEsquerda } from 'src/utils/utilities';

@Injectable()
export class RefeicaoResultadoMotivoService {

  constructor(
    private prisma: PrismaService,
    private appGateway: AppGateway
  ) {}

  async cadastrarMotivoAvaliacao(motivos: ICadastroMotivo[]) {

    await this.prisma.refeicao_resultado_motivo.createMany({
      data: [...motivos]
    });

    this.appGateway.atualizarValorGraficoMotivos();

    return {
      message: "Motivos registrados."
    };
  }

  pegarMotivos() {
    return this.prisma.refeicao_resultado_motivo.findMany();
  }
}
