import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorDialogService {

  private visibilidade = false;

  get visivel() {
    return this.visibilidade;
  }

  set visivel(value: boolean) {
    this.visibilidade = value;
  }

  constructor() { }
}
