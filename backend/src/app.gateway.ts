import { forwardRef, Inject, Logger } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { refeicao, refeicaoOpcoes } from './interfaces/IRefeicao';
import { RefeicaoHorarioService } from './refeicoes/refeicao-horario/services/refeicao-horario.service';
import { RefeicaoService } from './refeicoes/refeicao/services/refeicao.service';
import { RefeicaoResultadoService } from './refeicoes/refeicao_resultado/services/refeicao_resultado.service';
import { RefeicaoResultadoMotivoService } from './refeicoes/refeicao_resultado_motivo/services/refeicao_resultado_motivo.service';
import { RefeicaoOpcoes, RefeicaoTexto } from './types/types';

interface IRefeicaoStore {
  nome: RefeicaoTexto;
  id: number;
  horarioId: number;
}

const corsOrigins = ["http://localhost:3002", "http://147.1.5.47:3002"];
// const corsOrigins = ["http://147.1.0.84", "http://147.1.40.158", "http://147.1.0.85"];

const options = {
  cors: {
    origin: corsOrigins,
    methods: ["GET"],
    credentials: true,
    allowHeaders: ["my-header-custom"]
  }
}

@WebSocketGateway(options)
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  constructor(
    @Inject(forwardRef(() => RefeicaoHorarioService))
    private refeicaoHorarioService: RefeicaoHorarioService,
    @Inject(forwardRef(() => RefeicaoResultadoService))
    private refeicaoResultadoService: RefeicaoResultadoService
  ) {}

  private refeicaoAtual: RefeicaoOpcoes = 'aguardando';
  private ultimaRefeicaoVariavel: IRefeicaoStore = {
    horarioId: 1,
    id: 1,
    nome: refeicaoOpcoes['desjejum'] as RefeicaoTexto
  };

  @WebSocketServer()
  server: Server;

  set refeicao(value: RefeicaoOpcoes) {
    this.refeicaoAtual = value;
  }

  get refeicao() {
    return this.refeicaoAtual;
  }

  set ultimaRefeicao(value: IRefeicaoStore) {
    this.ultimaRefeicaoVariavel = value;
  }

  get ultimaRefeicao() {
    return this.ultimaRefeicaoVariavel;
  }

  private logger: Logger = new Logger('AppGateway');

  @SubscribeMessage('mudarRefeicao')
  mudarRefeicao(client: Socket, payload: { refeicao: RefeicaoOpcoes, horarioId: number }) {
    this.refeicaoAtual = payload.refeicao;
    if (payload.refeicao !== 'aguardando') {
      this.ultimaRefeicao = {
        horarioId: payload.horarioId,
        id: refeicao[payload.refeicao],
        nome: refeicaoOpcoes[payload.refeicao] as RefeicaoTexto
      };
    }

    this.emitMudarRefeicao(this.refeicaoAtual, payload.horarioId);
  }

  @SubscribeMessage('pegarRefeicao')
  emitirRefeicao(client: Socket, payload: {}) {
    this.refeicaoHorarioService.consultarHorario();
  }

  emitMudarRefeicao(refeicao: RefeicaoOpcoes , horarioId: number) {
    this.server.emit('pegarRefeicao', { refeicao, horarioId, ultimaRefeicao: this.ultimaRefeicao });
  }

  atualizarValorGrafico(refe_id: number, reav_id: number) {
    this.server.emit('atualizarValorGrafico', {
      refe_id,
      reav_id,
    });
  }

  async atualizarValorGraficoMotivos() {

    const motivos = await this.refeicaoResultadoService.pegarAvaliacaoPorDataEHora(new Date(), this.ultimaRefeicao.horarioId);

    this.server.emit('atualizarMotivos', { payload: motivos });
  }

  afterInit(server: Server) {
    this.logger.log("Init");
  }

  handleConnection(client: any, ...args: any[]) {
    
    this.refeicaoHorarioService.consultarHorario(); 
    setTimeout(() => {
    }, 500);
    this.logger.log("Connected " + client.id);
  }

  handleDisconnect(client: any) {
    this.logger.log("Disconnected " + client.id);
  }

}