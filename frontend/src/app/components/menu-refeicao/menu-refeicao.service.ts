import { Injectable } from '@angular/core';
import api from 'src/api/api';
import { IRefeicao } from 'src/app/interfaces/IRefeicao';


@Injectable({
  providedIn: 'root'
})
export class MenuRefeicaoService {

  constructor() { }

  async pegarTodasRefeicoes() {
    return api.get<IRefeicao[]>('/refeicao');
  }
}
