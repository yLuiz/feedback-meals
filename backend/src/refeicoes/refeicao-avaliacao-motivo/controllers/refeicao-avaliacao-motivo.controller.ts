import { Controller, Get, Param } from '@nestjs/common';
import { RefeicaoAvaliacaoMotivoService } from '../services/refeicao-avaliacao-motivo.service';

@Controller('refeicao-avaliacao-motivo')
export class RefeicaoAvaliacaoMotivoController {

  constructor(
    private refeicaoAvaliacaoMotivoService: RefeicaoAvaliacaoMotivoService
  ) {}

  @Get()
  pegarAvaliacaoMotivos() {
    return this.refeicaoAvaliacaoMotivoService.pegarAvaliacaoMotivos();
  }
}
