import { Injectable } from '@angular/core';
import { IRefeicaoHorario } from '../interfaces/IRefeicaoHorario';
import { MealsText } from '../types/types';

interface IStore {
  refeicao: {
    nome: MealsText,
    id: number
  },
  feedback: {
    refeicao: {
      nome: MealsText,
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
    refeicao: {
      nome: "Desjejum",
      id: 1
    },
    feedback: {
      refeicao: {
        nome: "Desjejum",
        id: 1
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

  get refeicao() {
    return this.globalVariables.refeicao;
  }

  set refeicao(refeicao: { nome: MealsText, id: number }) {
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
        nome: "Desjejum",
        id: 1
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
