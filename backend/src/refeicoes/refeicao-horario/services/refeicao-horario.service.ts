import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Cron } from '@nestjs/schedule';
import { AppGateway } from 'src/app.gateway';
import { RefeicaoOpcoes } from 'src/types/types';

export interface IRefeicaoAtual {
  reho_id: number;
  reho_refe_id: number;
  reho_hora_inicio: Date;
  reho_hora_fim: Date;
  refe_id: number;
  refe_refeicao: string;
  refe_status: "0" | "1";
}

@Injectable()
export class RefeicaoHorarioService {

  constructor(
    private prisma: PrismaService,
    private appGateway: AppGateway
  ) {}

  private readonly logger = new Logger(RefeicaoHorarioService.name);

  @Cron('0 * * * * *')
  async consultarHorario() {
    let refeicaoAtual = await this.pegarRefeicaoAtual();
    console.log(refeicaoAtual);
    if (refeicaoAtual && refeicaoAtual.refe_refeicao === "almoco/janta") {
      refeicaoAtual.refe_refeicao = "almoco";
    }

    if (!refeicaoAtual) {
      this.appGateway.mudarRefeicao(null, { refeicao: 'aguardando' })
      this.appGateway.refeicao = 'aguardando';
      return;
    }

    this.appGateway.mudarRefeicao(null, { refeicao: refeicaoAtual.refe_refeicao as RefeicaoOpcoes })
    this.appGateway.refeicao = refeicaoAtual.refe_refeicao as RefeicaoOpcoes;

  }

  pegarHorarios() {
    return this.prisma.refeicao_horarios.findMany({
      include: {
        refeicao: true
      }
    });
  }

  async pegarRefeicaoAtual() {
      const query = await this.prisma.$queryRaw`
      SELECT *
      FROM refeicao_horarios as reho
      INNER JOIN refeicao ON refeicao.refe_id = reho.reho_refe_id
      WHERE 
      TIME(NOW()) BETWEEN reho_hora_inicio AND reho_hora_fim`;

      return query[0] as IRefeicaoAtual;
  }
}
