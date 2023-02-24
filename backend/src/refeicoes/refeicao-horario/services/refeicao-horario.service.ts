import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RefeicaoHorarioService {

  constructor(
    private prisma: PrismaService
  ) {}

  pegarHorarios() {
    return this.prisma.refeicao_horarios.findMany({
      include: {
        refeicao: true
      }
    });
  }

  pegarRefeicaoAtual() {
    return this.prisma.$queryRaw`
      SELECT *
      FROM refeicao_horarios as reho
      INNER JOIN refeicao ON refeicao.refe_id = reho.reho_refe_id
      WHERE 
      TIME(NOW()) BETWEEN reho_hora_inicio AND reho_hora_fim`
  }
}
