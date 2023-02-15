import { Injectable } from '@angular/core';
import api from 'src/api/api';

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

  get refeId() {
    return this.refeicaoResultadoId;
  }

  set refeId(value: number) {
    this.refeicaoResultadoId = value;
  }

  public mostrar(rere_id: number) {

    this.refeId = rere_id;

    this.motivoVisibility = true;
    this.motivoClasse = 'motivo-container show-container';
  }

  public esconder(timer: number) {
    this.motivoClasse = 'motivo-container hide-container';
    setTimeout(() => {
      this.motivoVisibility = false;
    }, timer);
  }

  public cadastrarMotivoAvaliacao(data: { motivos: string[] }) {
    return api.patch('refeicao-resultado', data);
  }

}
