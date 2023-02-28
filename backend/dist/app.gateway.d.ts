import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RefeicaoOpcoes } from './types/types';
export declare class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    constructor();
    private refeicaoAtual;
    server: Server;
    set refeicao(value: RefeicaoOpcoes);
    get refeicao(): RefeicaoOpcoes;
    private logger;
    mudarRefeicao(client: Socket, payload: {
        refeicao: RefeicaoOpcoes;
        horarioId: number;
    }): void;
    emitMudarRefeicao(refeicao: RefeicaoOpcoes, horarioId: number): void;
    atualizarValorGrafico(refe_id: number, reav_id: number): void;
    afterInit(server: Server): void;
    emitPegarRefeicao(): void;
    handleConnection(client: any, ...args: any[]): void;
    handleDisconnect(client: any): void;
}
