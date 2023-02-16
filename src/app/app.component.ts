import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { mealsOption } from './interfaces/IRefeicao';
import { refeicao } from './references/refeicao';
import { StoreService } from './store/store.service';
import { MealsOption, MealsText } from './types/types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'feedback-meals';

  constructor(
    private socket: Socket,
    private store: StoreService
  ) {}

  ngOnInit(): void {
    this.socket.on('pegarRefeicao', (response: { refeicao: MealsOption }) => {
      this.store.refeicao = {
        id: refeicao[response.refeicao],
        nome: mealsOption[response.refeicao] as MealsText
      }

      this.store.feedback = {
        ...this.store.feedback,
        refeicao: {
          id: refeicao[response.refeicao],
          nome: mealsOption[response.refeicao] as MealsText
        }
      }
    })
  }
}
