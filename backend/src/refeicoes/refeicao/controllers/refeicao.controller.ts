import { Controller, Get, Param } from '@nestjs/common';
import { RefeicaoService } from '../services/refeicao.service';

@Controller('refeicao')
export class RefeicaoController {
  
  constructor(private refeicaoService: RefeicaoService) {}
  
  @Get()
  pegarTodasRefeicoes() {
    return this.refeicaoService.pegarTodas();
  }

  @Get(':refe_id')
  pegarRefeicaoPorId(@Param('refe_id') refe_id: number) {
    return this.refeicaoService.pegarRefeicaoPorId(refe_id);
  }
}
