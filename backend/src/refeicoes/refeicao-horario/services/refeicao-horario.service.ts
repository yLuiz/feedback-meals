import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Cron } from '@nestjs/schedule';
import { AppGateway } from 'src/app.gateway';
import { RefeicaoOpcoes, RefeicaoTexto } from 'src/types/types';
import { refeicaoOpcoes } from 'src/interfaces/IRefeicao';

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

  logger = new Logger();

  constructor(
    private prisma: PrismaService,
    @Inject(forwardRef(() => AppGateway))
    private appGateway: AppGateway,
  ) {}

  @Cron('0 * * * * *')
  async consultarHorario() {

    let refeicaoAtual = await this.pegarRefeicaoAtual();

    if (!refeicaoAtual) {
      this.appGateway.emitMudarRefeicao('aguardando' , 0);
      this.appGateway.refeicao = 'aguardando';
      return;
    }
    
    const refeicao = refeicaoAtual.refe_refeicao.split('/')[0];
    refeicaoAtual.refe_refeicao = refeicao;
    
    this.appGateway.ultimaRefeicao = {
      horarioId: refeicaoAtual.reho_id,
      id: refeicaoAtual.refe_id,
      nome: refeicaoOpcoes[refeicao] as RefeicaoTexto
    };

    this.appGateway.emitMudarRefeicao(refeicaoAtual.refe_refeicao as RefeicaoOpcoes, refeicaoAtual.reho_id);
    this.appGateway.refeicao = refeicaoAtual.refe_refeicao as RefeicaoOpcoes;
  };

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
