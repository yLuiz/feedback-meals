import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RefeicaoAvaliacaoMotivoService {

  constructor(
    private prisma: PrismaService
  ) {}

  pegarAvaliacaoMotivos() {
    return this.prisma.refeicao_avaliacao_motivo.findMany({
      orderBy: {
        ream_motivo: 'asc'
      }
    });
  }

}
