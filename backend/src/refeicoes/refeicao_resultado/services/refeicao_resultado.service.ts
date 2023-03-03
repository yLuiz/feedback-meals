import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AppGateway } from 'src/app.gateway';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class RefeicaoResultadoService {
  
  constructor(
    private prisma: PrismaService,
    private AppGateway: AppGateway

  ) {}

  async pegarTodas() {
    return await this.prisma.refeicao_resultado.findMany();
  }

  async cadastrarAvaliacao(refe_id: number, reav_id: number, reho_id: number) {

    if (!refe_id) refe_id = 1;

    const refeicao_resultado = await this.prisma.refeicao_resultado.create({
      data: {
        rere_refe_id: refe_id,
        rere_reav_id: reav_id,
        rere_reho_id: reho_id,
        // rere_data_registro: new Date()
      }
    });
    this.AppGateway.atualizarValorGrafico(refe_id, reav_id);
    console.log(refeicao_resultado)

    return { rere_id: refeicao_resultado.rere_id, rere_data_registro: refeicao_resultado.rere_data_registro };
  }

  async pegarAvaliacoesPorRefeicao(refe_id: number) {
    const avaliacoes = await this.prisma.refeicao_resultado.findMany({
      where: {
        rere_refe_id: refe_id,
      }
    });

    return avaliacoes.filter(avaliacao => avaliacao.rere_data_registro.getDate() === new Date().getDate());
  }

  async pegarDetalhesRefeicaoResultado() {

    // Refeicao
    // Avaliacao
    // Motivos
    const motivos =  await this.prisma.refeicao_avaliacao_motivo.findMany();

    const resultados = await this.prisma.refeicao_resultado.findMany({
      include: {
        refeicao: true,
        refeicao_avaliacao: true,
        refeicao_resultado_motivo: true,
        refeicao_horarios: true
      }
    });

    let resultadosRetorno = resultados.map(resultado => {
      return {
        refeicao: resultado.refeicao.refe_refeicao,
        avaliacao: resultado.refeicao_avaliacao.reav_tipo,
        motivo: resultado.refeicao_resultado_motivo.map(resultado => {
          return motivos.filter(motivo => resultado.rerm_ream_id === motivo.ream_id)[0];
        })
      }
    })

    return resultadosRetorno;
  }
}
