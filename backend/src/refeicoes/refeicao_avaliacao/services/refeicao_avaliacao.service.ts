import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class RefeicaoAvaliacaoService {
  
  constructor(
    private prisma: PrismaService
  ) {}

  async pegarTodas() {
    return await this.prisma.refeicao_avaliacao.findMany();
  }
  
}
