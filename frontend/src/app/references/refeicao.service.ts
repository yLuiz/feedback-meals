import { Injectable } from '@angular/core';
import api from 'src/api/api';
import { IRefeicao } from '../interfaces/IRefeicao';


@Injectable({
  providedIn: 'root'
})
export class RefeicaoService {

  constructor() { 
    this._refeicao = {...this._refeicao, aguardando: 0};
  }

  private _refeicao = {};

  get refeicao() {
    return this._refeicao;
  }

  public async consultarRefeicoes() {
    const refeicoes = await api.get<IRefeicao[]>('refeicao');

    refeicoes.data.forEach(refeicao => {
      const refeicaoNome = refeicao.refe_refeicao.split('/')[0];
      
      this._refeicao = {
        ...this._refeicao,
        [refeicaoNome]: refeicao.refe_id
      }
    });

    return this._refeicao;
  }
    
  refeicao_avaliacao = {
    otimo: 1,
    bom: 2,
    regular: 3
  }
}
