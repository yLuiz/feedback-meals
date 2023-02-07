import { Injectable } from '@angular/core';

type MealsText = "Dejejum" | "Almoço / Janta" | "Lanche";

@Injectable({
  providedIn: 'root'
})
export class StoreService {constructor() {
  }

  private globalVariables: { 
    refeicao: MealsText; 
  } = {
    refeicao: "Dejejum"
  };

  get refeicao() {
    return this.globalVariables.refeicao;
  }

  set refeicao(option: MealsText) {
    this.globalVariables.refeicao = option;
  }


}
