import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RefeicaoOpcoes } from './types/types';
export declare class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    constructor();
    private refeicaoAtual;
    server: Server;
    private logger;
    mudarRefeicao(client: Socket, payload: {
        refeicao: RefeicaoOpcoes;
    }): void;
    atualizarValorGrafico(refe_id: number, reav_id: number): void;
    afterInit(server: Server): void;
    handleConnection(client: any, ...args: any[]): void;
    handleDisconnect(client: any): void;
}
