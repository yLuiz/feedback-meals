import { Injectable } from '@angular/core';
import { IRefeicaoHorario } from '../interfaces/IRefeicaoHorario';
import { RefeicaoTexto } from '../types/types';
import { mealsOption } from '../interfaces/IRefeicao';
import { refeicao } from '../references/refeicao';

export interface IRefeicaoStore {
  nome: RefeicaoTexto;
  id: number;
  horarioId: number;
}

interface IStore {
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
  
  private refeicoes: any[];

  constructor() {

    this.refeicoes = [];

  }


  private globalVariables: IStore = {
    ultimaRefeicao: {
      horarioId: 1,
      id: 1,
      nome: mealsOption['desjejum'] as RefeicaoTexto
    },
    avaliacaoHabilitada: false,
    refeicao: {
      nome: mealsOption['aguardando'] as RefeicaoTexto,
      id: refeicao['aguardando'],
      horarioId: 0
    },
    feedback: {
      refeicao: {
        nome: mealsOption['aguardando'] as RefeicaoTexto,
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
        nome: mealsOption['aguardando'] as RefeicaoTexto,
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
