import { Controller, Get } from '@nestjs/common';
import { RefeicaoAvaliacaoService } from '../services/refeicao_avaliacao.service';

@Controller('refeicao-avaliacao')
export class RefeicaoAvaliacaoController {

  constructor(
    private refeicaoAvaliacaoService: RefeicaoAvaliacaoService
  ){ }

  @Get()
  pegarTodasRefeicaoAvaliacao() {
    return this.refeicaoAvaliacaoService.pegarTodas();
  }

}
