import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import api from 'src/api/api';
import { mealsOption } from './interfaces/IRefeicao';
import { IRefeicaoHorario } from './interfaces/IRefeicaoHorario';
import { refeicao } from './references/refeicao';
import { StoreService } from './store/store.service';
import { RefeicaoOpcoes, RefeicaoTexto } from './types/types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

  title = 'feedback-meals';

  constructor(
    private socket: Socket,
    private store: StoreService
  ) {}

  ngOnInit(): void {

    api.get<IRefeicaoHorario[]>('refeicao-horario')
      .then(response => {
        
        this.store.horarios = response.data.map(horario => {
          return {
            ...horario,
            reho_hora_inicio: new Date(`${horario.reho_hora_inicio}`),
            reho_hora_fim: new Date(`${horario.reho_hora_fim}`)
          }
        });
      })

    this.socket.on('pegarRefeicao', (response: { refeicao: RefeicaoOpcoes }) => {
      this.store.refeicao = {
        id: refeicao[response.refeicao],
        nome: mealsOption[response.refeicao] as RefeicaoTexto
      }

      this.store.feedback = {
        ...this.store.feedback,
        refeicao: {
          id: refeicao[response.refeicao],
          nome: mealsOption[response.refeicao] as RefeicaoTexto
        }
      }
    })
  }
}
