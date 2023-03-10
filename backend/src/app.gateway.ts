import { Logger } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';


const options = {
  cors: {
    origin: "https://feedback-meals.vercel.app",
    // origin: ["http://147.1.0.84", "http://147.1.40.158", "http://147.1.0.85"],
    methods: ["GET"],
    credentials: true,
    allowHeaders: ["my-header-custom"]
  }
}

@WebSocketGateway(options)
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  constructor() {}

  private refeicaoAtual: string = 'desjejum';

  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('AppGateway');

  @SubscribeMessage('mudarRefeicao')
  mudarRefeicao(client: Socket, payload: { refeicao: string }) {
    this.refeicaoAtual = payload.refeicao;
    this.server.emit('pegarRefeicao', { refeicao: this.refeicaoAtual});
  }

  atualizarValorGrafico(refe_id: number, reav_id: number) {
    this.server.emit('atualizarValorGrafico', {
      refe_id,
      reav_id,
    });
  }

  afterInit(server: Server) {
    this.logger.log("Init")
  }

  handleConnection(client: any, ...args: any[]) {
    this.server.emit('pegarRefeicao', { refeicao: this.refeicaoAtual });
    this.logger.log("Connected " + client.id);
  }

  handleDisconnect(client: any) {
    this.logger.log("Disconnected " + client.id);
  }

}