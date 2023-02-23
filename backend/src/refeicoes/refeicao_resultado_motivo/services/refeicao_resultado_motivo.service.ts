import { Injectable } from '@nestjs/common';
import { ICadastroMotivo } from 'src/interfaces/ICadastroMotivo';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RefeicaoResultadoMotivoService {

  constructor(
    private prisma: PrismaService
  ) {}

  async cadastrarMotivoAvaliacao(motivos: ICadastroMotivo[]) {

    const motivosRegistrados = await this.prisma.refeicao_resultado_motivo.createMany({
      data: [...motivos]
    });
    return motivosRegistrados;
  }

  pegarMotivos() {
    return this.prisma.refeicao_resultado_motivo.findMany();
  }

}
