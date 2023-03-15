import { Injectable } from '@angular/core';
import { refeicaoOpcao } from '../interfaces/IRefeicao';
import { IRefeicaoHorario } from '../interfaces/IRefeicaoHorario';
import { RefeicaoTexto } from '../types/types';

export interface IRefeicaoStore {
  nome: RefeicaoTexto;
  id: number;
  horarioId: number;
}

const refeicao = { aguardando: 0 }

export interface IStore {
  ultimaRefeicaoGrafico: IRefeicaoStore,
  ultimaRefeicao: IRefeicaoStore,
  avaliacaoHabilitada: boolean;
  refeicao: IRefeicaoStore;
  feedback: {
    refeicao: IRefeicaoStore;
    avaliacao: {
      otimo: number,
      bom: number,
      regular: number,
      ruim: number,
    };
  },
  horarios: IRefeicaoHorario[]
}

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor() {}
  
  private globalVariables: IStore = {
    ultimaRefeicaoGrafico: {
      horarioId: 1,
      id: 1,
      nome: refeicaoOpcao['desjejum'] as RefeicaoTexto
    },
    ultimaRefeicao: {
      horarioId: 1,
      id: 1,
      nome: refeicaoOpcao['desjejum'] as RefeicaoTexto
    },
    avaliacaoHabilitada: false,
    refeicao: {
      nome: refeicaoOpcao['aguardando'] as RefeicaoTexto,
      id: refeicao['aguardando'],
      horarioId: 0
    },
    feedback: {
      refeicao: {
        nome: refeicaoOpcao['aguardando'] as RefeicaoTexto,
        id: refeicao['aguardando'],
        horarioId: 0
      },
      avaliacao: {
        otimo: 0,
        bom: 0,
        regular: 0,
        ruim: 0
      }
    },
    horarios: []
  };

  get ultimaRefeicao() {
    return this.globalVariables.ultimaRefeicao;
  }

  set ultimaRefeicao(value: IRefeicaoStore) {
    this.globalVariables.ultimaRefeicao = value;
  }

  get ultimaRefeicaoGrafico() {
    return this.globalVariables.ultimaRefeicaoGrafico;
  }

  set ultimaRefeicaoGrafico(value: IRefeicaoStore) {
    this.globalVariables.ultimaRefeicaoGrafico = value;
  }

  get avaliacaoHabilitada() {
    return this.globalVariables.avaliacaoHabilitada;
  }

  set avaliacaoHabilitada(value: boolean) {
    this.globalVariables.avaliacaoHabilitada = value;
  }

  get refeicao() {
    return this.globalVariables.refeicao;
  }

  set refeicao(refeicao: { nome: RefeicaoTexto, id: number, horarioId: number }) {
    this.globalVariables.refeicao = {
      id: refeicao.id,
      nome: refeicao.nome,
      horarioId: refeicao.horarioId
    };
  }

  get feedback() {
    return this.globalVariables.feedback;
  }

  set feedback(data) {
    this.globalVariables.feedback = {
      refeicao: data.refeicao,
      avaliacao: data.avaliacao
    }
  }

  get horarios() {
    return this.globalVariables.horarios;
  }

  set horarios(horarios: IRefeicaoHorario[]) {
    this.globalVariables.horarios = horarios;
  }

  public feedbackClear() {
    this.globalVariables.feedback = {
      refeicao: {
        nome: refeicaoOpcao['aguardando'] as RefeicaoTexto,
        id: refeicao['aguardando'],
        horarioId: 0
      },
      avaliacao: {
        otimo: 0,
        bom: 0,
        regular: 0,
        ruim: 0
      }
    }
  }
}
