import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Cron } from '@nestjs/schedule';
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

@Injectable()
export class RefeicaoHorarioService {

  constructor(
    private prisma: PrismaService,
    private socket: AppGateway
  ) {}

  private readonly logger = new Logger(RefeicaoHorarioService.name);

  @Cron('*/5 * * * * *')
  consultarHorario() {
    const refeicaoAtual = this.pegarRefeicaoAtual();
    console.log(refeicaoAtual)  
  }

  pegarHorarios() {
    return this.prisma.refeicao_horarios.findMany({
      include: {
        refeicao: true
      }
    });
  }

  pegarRefeicaoAtual() {
      const query = this.prisma.$queryRaw`
      SELECT *
      FROM refeicao_horarios as reho
      INNER JOIN refeicao ON refeicao.refe_id = reho.reho_refe_id
      WHERE 
      TIME(NOW()) BETWEEN reho_hora_inicio AND reho_hora_fim`;

      return query[0] as IRefeicaoAtual;
  }
}
