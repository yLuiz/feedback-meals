import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { RefeicaoService } from './refeicoes/refeicao/services/refeicao.service';
import { RefeicaoController } from './refeicoes/refeicao/controllers/refeicao.controller';
import { RefeicaoAvaliacaoService } from './refeicoes/refeicao_avaliacao/services/refeicao_avaliacao.service';
import { RefeicaoAvaliacaoController } from './refeicoes/refeicao_avaliacao/controllers/refeicao_avaliacao.controller';
import { RefeicaoResultadoService } from './refeicoes/refeicao_resultado/services/refeicao_resultado.service';
import { RefeicaoResultadoController } from './refeicoes/refeicao_resultado/controllers/refeicao_resultado.controller';
import { AppGateway } from './app.gateway';
import { RefeicaoResultadoMotivoController } from './refeicoes/refeicao_resultado_motivo/controllers/refeicao_resultado_motivo.controller';
import { RefeicaoResultadoMotivoService } from './refeicoes/refeicao_resultado_motivo/services/refeicao_resultado_motivo.service';
import { RefeicaoAvaliacaoMotivoService } from './refeicoes/refeicao-avaliacao-motivo/services/refeicao-avaliacao-motivo.service';
import { RefeicaoAvaliacaoMotivoController } from './refeicoes/refeicao-avaliacao-motivo/controllers/refeicao-avaliacao-motivo.controller';
import { RefeicaoHorarioService } from './refeicoes/refeicao-horario/services/refeicao-horario.service';
import { RefeicaoHorarioController } from './refeicoes/refeicao-horario/controllers/refeicao-horario.controller';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [ScheduleModule.forRoot()],
  controllers: [
    RefeicaoController,
    RefeicaoAvaliacaoController,
    RefeicaoResultadoController,
    RefeicaoResultadoMotivoController,
    RefeicaoAvaliacaoMotivoController,
    RefeicaoHorarioController,
  ],
  providers: [
    PrismaService,
    RefeicaoService,
    RefeicaoHorarioService,
    RefeicaoAvaliacaoService,
    RefeicaoResultadoService,
    AppGateway,
    RefeicaoResultadoMotivoService,
    RefeicaoAvaliacaoMotivoService,
  ],
  exports: [RefeicaoHorarioService],
})
export class AppModule {}
