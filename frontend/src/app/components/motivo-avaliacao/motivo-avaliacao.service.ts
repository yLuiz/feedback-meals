import { Injectable } from '@angular/core';
import api from 'src/api/api';
import { IAvaliacaoMotivo, ICadastroMotivo } from 'src/app/interfaces/IRefeicaoAvaliacaoMotivo';

@Injectable({
  providedIn: 'root'
})
export class MotivoAvaliacaoService {

  constructor() { }

  private refeicaoResultadoId: number = 0;
  private motivoClasse = 'motivo-container';
  private motivoVisibility = false;

  get classe() {
    return this.motivoClasse;
  }

  get visibility() {
    return this.motivoVisibility;
  }

  get rereId() {
    return this.refeicaoResultadoId;
  }

  set rereId(value: number) {
    this.refeicaoResultadoId = value;
  }

  public mostrar(rere_id: number) {

    this.rereId = rere_id;

    this.motivoVisibility = true;
    this.motivoClasse = 'motivo-container show-container';
  }

  public esconder(timer: number) {
    this.motivoClasse = 'motivo-container hide-container';
    setTimeout(() => {
      this.motivoVisibility = false;
    }, timer);
  }

  public cadastrarMotivoAvaliacao(data: { motivos: ICadastroMotivo[] }) {
    return api.post('refeicao-resultado-motivo', data);
  }

  public pegarMotivosAvaliacao() {
    return api.get<IAvaliacaoMotivo[]>('refeicao-avaliacao-motivo');
  }

}
