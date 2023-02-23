import { Injectable } from '@angular/core';
import api from 'src/api/api';
import { IRefeicaoResultadoResponse } from 'src/app/interfaces/IRefeicaoResultado';

@Injectable({
  providedIn: 'root'
})
export class GraficoService {

  constructor() { }

  pegarAvaliacoesPorRefeicao(refe_id: number) {
    return api.get<IRefeicaoResultadoResponse[]>(`/refeicao-resultado/${refe_id}`);
  }

}
