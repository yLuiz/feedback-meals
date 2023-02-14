import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MotivoAvaliacaoService {

  constructor() { }

  private motivoClasse = 'motivo-container';
  private motivoVisibility = false;

  get classe() {
    return this.motivoClasse;
  }

  get visibility() {
    return this.motivoVisibility;
  }

  public mostrar() {
    this.motivoVisibility = true;
    this.motivoClasse = 'motivo-container show-container';
  }

  public esconder(timer: number) {
    this.motivoClasse = 'motivo-container hide-container';
    setTimeout(() => {
      this.motivoVisibility = false;
    }, timer);
  }

}
