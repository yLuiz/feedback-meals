import { IRefeicaoStore } from "../store/store.service";
import { RefeicaoOpcoes } from "../types/types";

export interface IPegarRefeicaoEvent {
  refeicao: RefeicaoOpcoes, 
  horarioId: number;
  ultimaRefeicao: IRefeicaoStore
}