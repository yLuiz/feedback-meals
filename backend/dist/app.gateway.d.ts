import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RefeicaoHorarioService } from './refeicoes/refeicao-horario/services/refeicao-horario.service';
import { RefeicaoOpcoes, RefeicaoTexto } from './types/types';
interface IRefeicaoStore {
    nome: RefeicaoTexto;
    id: number;
    horarioId: number;
}
export declare class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private refeicaoHorarioService;
    constructor(refeicaoHorarioService: RefeicaoHorarioService);
    private refeicaoAtual;
    private ultimaRefeicaoVariavel;
    server: Server;
    set refeicao(value: RefeicaoOpcoes);
    get refeicao(): RefeicaoOpcoes;
    set ultimaRefeicao(value: IRefeicaoStore);
    get ultimaRefeicao(): IRefeicaoStore;
    private logger;
    mudarRefeicao(client: Socket, payload: {
        refeicao: RefeicaoOpcoes;
        horarioId: number;
    }): void;
    emitMudarRefeicao(refeicao: RefeicaoOpcoes, horarioId: number): void;
    atualizarValorGrafico(refe_id: number, reav_id: number): void;
    afterInit(server: Server): void;
    subUltimaRefeicao(client: Socket, payload: {}): IRefeicaoStore;
    emitPegarRefeicao(): void;
    handleConnection(client: any, ...args: any[]): void;
    handleDisconnect(client: any): void;
}
export {};
