import { Body, Controller, Get, Post } from '@nestjs/common';
import { ICadastroMotivo } from 'src/interfaces/ICadastroMotivo';
import { RefeicaoResultadoMotivoService } from '../services/refeicao_resultado_motivo.service';

@Controller('refeicao-resultado-motivo')
export class RefeicaoResultadoMotivoController {

  constructor(
    private refeicaoResultadoMotivoService: RefeicaoResultadoMotivoService
  ) {}

  @Get()
  pegarMotivosAvaliacao() {
    return this.refeicaoResultadoMotivoService.pegarMotivos();
  }

  @Post()
  cadastrarMotivoAvaliacao(@Body() body: { motivos: ICadastroMotivo[]}) {

    const { motivos } = body;

    return this.refeicaoResultadoMotivoService.cadastrarMotivoAvaliacao(motivos);
  }

}
