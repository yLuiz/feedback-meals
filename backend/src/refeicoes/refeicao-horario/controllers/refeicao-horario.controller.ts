import { Controller, Get, Param } from '@nestjs/common';
import { IRefeicaoAtual, RefeicaoHorarioService } from '../services/refeicao-horario.service';

@Controller('refeicao-horario')
export class RefeicaoHorarioController {
  constructor(
    private refeicaoHorarioService: RefeicaoHorarioService,

  ) {}

  @Get()
  pegarRefeicaoHorarios() {
    return this.refeicaoHorarioService.pegarHorarios();
  }

  @Get('atual')
  pegarRefeicaoAtual() {
    return this.refeicaoHorarioService.pegarRefeicaoAtual() as Promise<IRefeicaoAtual>;
  }

  @Get(':refe_id')
  pegarHorarioPorRefeicao(@Param('refe_id') refe_id: number) {
    return this.refeicaoHorarioService.pegarHorariosPorRefeicao(Number(refe_id));
  }
}
