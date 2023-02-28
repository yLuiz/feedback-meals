import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Cron } from '@nestjs/schedule';
import { AppGateway } from 'src/app.gateway';
import { RefeicaoOpcoes, RefeicaoTexto } from 'src/types/types';
import { mealsOption } from 'src/interfaces/IRefeicao';

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
    @Inject(forwardRef(() => AppGateway))
    private appGateway: AppGateway,
  ) {}

  @Cron('0 * * * * *')
  async consultarHorario() {
    let refeicaoAtual = await this.pegarRefeicaoAtual();
    console.log(refeicaoAtual);
    if (refeicaoAtual && refeicaoAtual.refe_refeicao === "almoco/janta") {
      refeicaoAtual.refe_refeicao = "almoco";
    }

    if (!refeicaoAtual) {
      this.appGateway.emitMudarRefeicao('aguardando' , 0);
      this.appGateway.refeicao = 'aguardando';
      return;
    }

    this.appGateway.emitMudarRefeicao(refeicaoAtual.refe_refeicao as RefeicaoOpcoes, refeicaoAtual.reho_id);
    this.appGateway.refeicao = refeicaoAtual.refe_refeicao as RefeicaoOpcoes;

    const refeicao = refeicaoAtual.refe_refeicao.split('/')[0];


    this.appGateway.ultimaRefeicao = {
      horarioId: refeicaoAtual.reho_id,
      id: refeicaoAtual.refe_id,
      nome: mealsOption[refeicao] as RefeicaoTexto
    }
  }

  pegarHorarios() {
    return this.prisma.refeicao_horarios.findMany({
      include: {
        refeicao: true
      }
    });
  }

  async pegarHorariosPorRefeicao(refe_id: number) {
    if (!refe_id) {
      return [];
    }

    return await this.prisma.refeicao_horarios.findMany({
      where: {
        reho_refe_id: refe_id
      }
    })
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
