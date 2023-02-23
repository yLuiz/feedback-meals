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

}
