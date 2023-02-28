import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RefeicaoService {

  constructor(
    private prisma: PrismaService
  ) {}

  async pegarTodas() {
    return await this.prisma.refeicao.findMany();
  }

  async pegarRefeicaoPorId(refe_id: number) {
    return await this.prisma.refeicao.findFirst({
      where: {
        refe_id,
      }
    })
  }
}