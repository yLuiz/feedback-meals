import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { AppGateway } from 'src/app.gateway';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class RefeicaoResultadoService {
  
  constructor(
    private prisma: PrismaService,
    @Inject(forwardRef(() => AppGateway))
    private appGateway: AppGateway
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
      }
    });
    this.appGateway.atualizarValorGrafico(refe_id, reav_id);

    return { rere_id: refeicao_resultado.rere_id, rere_data_registro: refeicao_resultado.rere_data_registro };
  }

  async pegarAvaliacoesPorRefeicao(reho_id: number) {

    if (!reho_id) throw new HttpException({ message: 'Id do horário da refeição é necessário.'}, HttpStatus.UNPROCESSABLE_ENTITY);

    const avaliacoes = await this.prisma.refeicao_resultado.findMany({
      where: {
        rere_reho_id: reho_id,
      },
    });
    

    return avaliacoes.filter(avaliacao => {

      const avaliacao_data = avaliacao.rere_data_registro;

      const dia = new Date().getDate();
      const mes = new Date().getMonth();
      const ano = new Date().getFullYear();
      
      const datasIguais = avaliacao_data.getDate() === dia && avaliacao_data.getMonth() === mes && avaliacao_data.getFullYear() === ano;

      if (datasIguais) return avaliacao;
    });
  }

  async pegarDetalhesRefeicaoResultado() {
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

  async pegarAvaliacaoPorDataEHora(date: Date, reho_id: number) {

    if (!date || !reho_id) throw new HttpException({
      message: "É necessário informar a data e horário."
    }, HttpStatus.UNPROCESSABLE_ENTITY);

    function zeroSuffix(numero: number, tamanho: number) {
      let numeroString = numero.toString();
      while (numeroString.length < tamanho) numeroString = "0" + numeroString;

      return numeroString;
    }

    const dia = zeroSuffix(new Date().getDate(), 2);

    // new Date().getMonth() + 1 porque o metodo getMonth() devolve um valor de 0 à 11, sendo 0 o primeiro mes;
    const mes = zeroSuffix(new Date().getMonth() + 1, 2);
    const ano = zeroSuffix(new Date().getFullYear(), 2);
    
    const data = `${ano}-${mes}-${dia}`;

    return this.prisma.$queryRaw`
      SELECT rere.rere_id, rere.rere_reho_id, reav.reav_tipo, ream.ream_id, ream.ream_motivo FROM refeicao_resultado rere
      INNER JOIN refeicao_avaliacao reav ON reav.reav_id = rere.rere_reav_id
      INNER JOIN refeicao_resultado_motivo rerm ON rere.rere_id = rerm.rerm_rere_id
      INNER JOIN refeicao_avaliacao_motivo ream ON rerm.rerm_ream_id = ream.ream_id
      WHERE DATE(rere_data_registro) = ${data} AND rere.rere_reho_id = ${reho_id}
      ORDER BY ream_motivo
    `;
  }
}
