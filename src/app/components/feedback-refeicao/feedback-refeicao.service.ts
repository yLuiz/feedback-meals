import { Injectable } from '@angular/core';
import api from 'src/api/api';
import { IRefeicaoResultadoRequest, IRefeicaoResultadoResponse } from 'src/app/interfaces/IRefeicaoResultado';

interface IRequestFeedback {
  refe_id: number;
  reav_id: number;
}

@Injectable({
  providedIn: 'root'
})
export class FeedbackRefeicaoService {

  constructor() { }

  async submitFeedback({ rere_refe_id, rere_reav_id }: IRefeicaoResultadoRequest) {
    await api.post('refeicao-resultado', {
      refe_id: rere_refe_id,
      reav_id: rere_reav_id,
    })
  }
}
