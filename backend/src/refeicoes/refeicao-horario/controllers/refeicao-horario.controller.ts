import { Controller, Get } from '@nestjs/common';
import { IRefeicaoAtual, RefeicaoHorarioService } from '../services/refeicao-horario.service';

@Controller('refeicao-horario')
export class RefeicaoHorarioController {
  constructor(
    private refeicaoHorarioService: RefeicaoHorarioService
  ) {}

  @Get()
  pegarRefeicaoHorarios() {
    return this.refeicaoHorarioService.pegarHorarios();
  }

  @Get('atual')
  pegarRefeicaoAtual() {
    return this.refeicaoHorarioService.pegarRefeicaoAtual() as IRefeicaoAtual;
  }
}
