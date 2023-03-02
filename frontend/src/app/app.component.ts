import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import api from 'src/api/api';
import { refeicaoOpcao } from './interfaces/IRefeicao';
import { IRefeicaoHorario } from './interfaces/IRefeicaoHorario';
import { IPegarRefeicaoEvent } from './interfaces/Socket.interfaces';
import { RefeicaoService } from './references/refeicao.service';
import { StoreService } from './store/store.service';
import { RefeicaoOpcoes, RefeicaoTexto, RefeicaoType } from './types/types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

  title = 'feedback-meals';
  refeicao!: RefeicaoType;

  constructor(
    private socket: Socket,
    private store: StoreService,
    private refeicaoService: RefeicaoService
  ) {}

  async ngOnInit(): Promise<void> {

    this.refeicao = await this.refeicaoService.consultarRefeicoes();

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

    this.socket.on('pegarRefeicao', (payload: IPegarRefeicaoEvent) => {

      if (payload.refeicao !== 'aguardando') this.store.avaliacaoHabilitada = true;

      this.store.refeicao = {
        id: this.refeicao[payload.refeicao],
        nome: refeicaoOpcao[payload.refeicao] as RefeicaoTexto,
        horarioId: payload.horarioId
      }

      this.store.ultimaRefeicao = payload.ultimaRefeicao;

      this.store.feedback = {
        ...this.store.feedback,
        refeicao: {
          id: this.refeicao[payload.refeicao],
          nome: refeicaoOpcao[payload.refeicao] as RefeicaoTexto,
          horarioId: payload.horarioId
        }
      }
    })
  }
}
