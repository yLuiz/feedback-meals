import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
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

  @Get('motivos')
  pegarAvaliacaoPorDataEHora(@Query() query: { data: Date, horario_id: number }) {
    const { data, horario_id: horarioId } = query;
    return this.refeicaoResultadoService.pegarAvaliacaoPorDataEHora(data, horarioId);
  }

  @Get(':refe_id')
  pegarTodasAvaliacoesPorRefeicao(@Param('refe_id') refe_id: number) {
    return this.refeicaoResultadoService.pegarAvaliacoesPorRefeicao(Number(refe_id));
  }

  @Post()
  cadastrarRefeicaoResultado(@Body() body: { 
    refe_id: number,
    reav_id: number,
    reho_id: number
  }) {

    const { refe_id, reav_id, reho_id } = body;

    return this.refeicaoResultadoService.cadastrarAvaliacao(refe_id, reav_id, reho_id);
  }
}
