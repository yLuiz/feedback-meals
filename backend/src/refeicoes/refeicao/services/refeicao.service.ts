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
}