import { Injectable } from '@angular/core';

type MealsText = "Desjejum" | "Almoço / Janta" | "Lanche";
interface IStore {
  refeicao: MealsText;
  feedback: {
    refeicao: MealsText;
    avaliacao: {
      otimo: number,
      bom: number,
      regular: number,
      ruim: number,
    };
  }
}

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  
  constructor() {}

  private globalVariables: IStore = {
    refeicao: "Desjejum", 
    feedback: {
      refeicao: "Desjejum",
      avaliacao: {
        otimo: 0,
        bom: 0,
        regular: 0,
        ruim: 0
      }
    }
  };

  get refeicao() {
    return this.globalVariables.refeicao;
  }

  set refeicao(option: MealsText) {
    this.globalVariables.refeicao = option;
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

  public feedbackClear() {
    this.globalVariables.feedback = {
      refeicao: "Desjejum",
      avaliacao: {
        otimo: 0,
        bom: 0,
        regular: 0,
        ruim: 0
      }
    }
  }


}
