import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/store/store.service';
import { MessageService } from '../message/message.service';
import { FeedbackRefeicaoService } from './feedback-refeicao.service';
import { refeicao, refeicao_avaliacao } from '../../references/refeicao';
import { MotivoAvaliacaoService } from '../motivo-avaliacao/motivo-avaliacao.service';
import { FeedbackOptions, MealsOption, MealsText } from 'src/app/types/types';
import { mealsOption } from 'src/app/interfaces/IRefeicao';
import { Socket } from 'ngx-socket-io';
import { IRefeicaoHorario } from 'src/app/interfaces/IRefeicaoHorario';
import api from 'src/api/api';


@Component({
  selector: 'app-feedback-refeicao',
  templateUrl: './feedback-refeicao.component.html',
  styleUrls: ['./feedback-refeicao.component.scss']
})
export class FeedbackRefeicaoComponent implements OnInit {
  

  constructor(
    private socket: Socket,
    public store: StoreService,
    private router: Router,
    private messageService: MessageService,
    private feedbackRefeicaoService: FeedbackRefeicaoService,
    public motivoAvaliacaoService: MotivoAvaliacaoService
  ) { }

  horarios: IRefeicaoHorario[] = [];
  timer!: ReturnType<typeof setTimeout>;
  title!: string;

  submitFeedback(feedbackKey: FeedbackOptions) {

    if (this.messageService.visibility) return;
        
    this.store.feedback = {
      refeicao: this.store.refeicao,
      avaliacao: {
        ...this.store.feedback.avaliacao,
        [feedbackKey]: this.store.feedback.avaliacao[feedbackKey] + 1,
      }
    }

    this.feedbackRefeicaoService.submitFeedback({ 
      rere_reav_id: refeicao_avaliacao[feedbackKey],
      rere_refe_id: this.store.feedback.refeicao.id
    }).then(response => {
      if(feedbackKey !== "otimo") {
        this.motivoAvaliacaoService.mostrar(response.data.rere_id);
      }
    })

    if (!this.messageService.visibility) {
      this.messageService.show();

      this.timer = setTimeout(() => {
        this.messageService.hide();
      }, 2000);
    }
  }

  goToMenu() {
    this.router.navigate(['menu']);
  }

  horaMaior(dateA: Date, dateB: Date) {
    if (dateA.getHours() == dateB.getUTCHours()) {
      if (dateA.getMinutes() > dateB.getUTCMinutes()) {
        console.log(`${dateA.getHours()}:${dateA.getUTCMinutes()}`);
        console.log(`${dateB.getUTCHours()}:${dateB.getUTCMinutes()}`);

        return true;
      } else {
        console.log(`${dateA.getHours()}:${dateA.getUTCMinutes()}`);
        console.log(`${dateB.getUTCHours()}:${dateB.getUTCMinutes()}`);

        return false;
      }
    } else if (dateA.getHours() > dateB.getUTCHours()) {
      console.log(`${dateA.getHours()}:${dateA.getUTCMinutes()}`);
      console.log(`${dateB.getUTCHours()}:${dateB.getUTCMinutes()}`);

      return true;
    } else {
      console.log(`${dateA.getHours()}:${dateA.getUTCMinutes()}`);
      console.log(`${dateB.getUTCHours()}:${dateB.getUTCMinutes()}`);

      return false;
    }
  }

  async setRefeicaoTitulo() {
    this.horarios = await api.get<IRefeicaoHorario[]>('refeicao-horario')
      .then(response => {
        return response.data.map(horario => {
          return {
            ...horario,
            reho_hora_inicio: new Date(`${horario.reho_hora_inicio}`),
            reho_hora_fim: new Date(`${horario.reho_hora_fim}`)
          }
        });
      });

    const horario = this.horarios.find(item => item.reho_id === 3) as IRefeicaoHorario;
    const almoco = this.horaMaior(new Date(), horario.reho_hora_inicio) && !this.horaMaior(new Date(), horario.reho_hora_fim);
    console.log(almoco);
  }

  ngOnInit(): void {

    this.title = this.store.refeicao.nome

    this.socket.on('pegarRefeicao', (response: { refeicao: MealsOption }) => {
      const refeicaoPropriedades = {
        nome: mealsOption[response.refeicao] as MealsText,
        id: refeicao[response.refeicao]
      }
  
      this.store.refeicao = refeicaoPropriedades;
      this.store.feedback.refeicao = refeicaoPropriedades;

      this.title = mealsOption[response.refeicao];
    });

    this.setRefeicaoTitulo();
  }

}
