import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { RefeicaoResultadoService } from '../services/refeicao_resultado.service';

@Controller('refeicao-resultado')
export class RefeicaoResultadoController {

  constructor(
    private refeicaoResultadoService: RefeicaoResultadoService
  ){}

  @Get()
  pegarTodasRefeicaoResultado() {
    return this.refeicaoResultadoService.pegarTodas();
  }

  @Get('detalhes')
  pegarDetalhesRefeicaoResultado() {
    return this.refeicaoResultadoService.pegarDetalhesRefeicaoResultado();
  }

  @Get(':refe_id')
  pegarTodasAvaliacoesPorRefeicao(@Param('refe_id') refe_id: number) {
    return this.refeicaoResultadoService.pegarAvaliacoesPorRefeicao(Number(refe_id));
  }

  @Post()
  cadastrarRefeicaoResultado(@Body() body: { 
    refe_id: number,
    reav_id: number,
    rere_reho_id: number
  }) {

    const { refe_id, reav_id, rere_reho_id } = body;

    return this.refeicaoResultadoService.cadastrarAvaliacao(refe_id, reav_id, rere_reho_id);
  }
}
