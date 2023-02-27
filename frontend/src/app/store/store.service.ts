import { Injectable } from '@angular/core';
import { IRefeicaoHorario } from '../interfaces/IRefeicaoHorario';
import { RefeicaoTexto } from '../types/types';
import { mealsOption } from '../interfaces/IRefeicao';
import { refeicao } from '../references/refeicao';

interface IStore {
  avaliacaoHabilitada: boolean,
  refeicao: {
    nome: RefeicaoTexto,
    id: number
  },
  feedback: {
    refeicao: {
      nome: RefeicaoTexto,
      id: number
    };
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
    avaliacaoHabilitada: false,
    refeicao: {
      nome: mealsOption['aguardando'] as RefeicaoTexto,
      id: refeicao['aguardando']
    },
    feedback: {
      refeicao: {
        nome: mealsOption['aguardando'] as RefeicaoTexto,
        id: refeicao['aguardando']
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

  set refeicao(refeicao: { nome: RefeicaoTexto, id: number }) {
    this.globalVariables.refeicao = {
      id: refeicao.id,
      nome: refeicao.nome
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
        id: refeicao['aguardando']
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
