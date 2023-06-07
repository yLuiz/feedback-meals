import { Injectable } from '@angular/core';
import api from 'src/api/api';
import { ErrorDialogService } from '../components/error-dialog/error-dialog.service';
import { IRefeicao } from '../interfaces/IRefeicao';
import { RefeicaoType } from '../types/types';


@Injectable({
  providedIn: 'root'
})
export class RefeicaoService {

  constructor(
    private errorDialogService: ErrorDialogService
  ) { 
    this._refeicao = {...this._refeicao, aguardando: 0};
  }

  private _refeicao: RefeicaoType = {}; // { [refeicao: string]: id: number }

  get refeicao() {
    return this._refeicao;
  }

  public async consultarRefeicoes() {
    let refeicoes: IRefeicao[];
    await api.get<IRefeicao[]>('refeicao')
      .then(response => {

        refeicoes = response.data
        refeicoes.forEach(refeicao => {
          const refeicaoNome = refeicao.refe_refeicao.split('/')[0];
          
          this._refeicao = {
            ...this._refeicao,
            [refeicaoNome]: refeicao.refe_id
          }
        });
      })
      .catch(err =>  {
        this.errorDialogService.visivel = true;
        console.log(err)
      });

    return this._refeicao;
  }
    
  refeicao_avaliacao = {
    otimo: 1,
    bom: 2,
    regular: 3
  }
}
