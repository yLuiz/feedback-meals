import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private messageVisibility = false;
  private messageClass = "container";

  constructor() { }

  get visibility(): boolean {
    return this.messageVisibility;
  }

  public toggleVisibility() {
    this.messageVisibility = !this.messageVisibility;
  }

  get classe() {
    return this.messageClass;
  }

  public show() {
    this.messageVisibility = true;
    this.messageClass = "container show";
  }

  public hide() {
    this.messageVisibility = false;
    this.messageClass = "container hide";
  }
}
