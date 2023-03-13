import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import api from 'src/api/api';
import { IAvaliacaoMotivo, ICadastroMotivo } from 'src/app/interfaces/IRefeicaoAvaliacaoMotivo';

@Injectable({
  providedIn: 'root'
})
export class MotivoAvaliacaoService {

  constructor() {}

  eventPopupEscondida = new BehaviorSubject<boolean>(false);

  private refeicaoResultadoId: number = 0;
  private motivoClasse = 'motivo-container';
  private motivoVisibility = false;
  private motivosEnviadosVariavel = false;

  set motivosEnviados(value: boolean) {
    this.motivosEnviadosVariavel = value;
  }

  get motivosEnviados() {
    return this.motivosEnviadosVariavel;
  }

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
    this.eventPopupEscondida.next(false)
    this.motivoClasse = 'motivo-container show-container';
  }

  public esconder(timer: number) {
    setTimeout(() => {
      this.motivoClasse = 'motivo-container hide-container';
      this.eventPopupEscondida.next(true)
    }, timer);

    setTimeout(() => {
      this.motivoVisibility = false;
    }, timer + 1000);
  }

  public cadastrarMotivoAvaliacao(data: { motivos: ICadastroMotivo[] }) {
    return api.post('refeicao-resultado-motivo', data);
  }

  public pegarMotivosAvaliacao() {
    return api.get<IAvaliacaoMotivo[]>(`refeicao-avaliacao-motivo`);
  }

}
