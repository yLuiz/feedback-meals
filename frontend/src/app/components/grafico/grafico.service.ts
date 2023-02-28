import { Injectable } from '@angular/core';
import api from 'src/api/api';
import { IRefeicaoResultadoResponse } from 'src/app/interfaces/IRefeicaoResultado';
import { ITipoAvaliacao } from 'src/app/interfaces/ITipoAvaliacao';

@Injectable({
  providedIn: 'root'
})
export class GraficoService {

  constructor() { }

  pegarAvaliacoesPorRefeicao(refe_id: number) {
    return api.get<IRefeicaoResultadoResponse[]>(`refeicao-resultado/${refe_id}`);
  }

  pegarTiposAvaliacoes() {
    return api.get<ITipoAvaliacao[]>('refeicao-avaliacao');
  }

}
