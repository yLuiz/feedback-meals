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
  loadingMotivos: boolean = false;

  async submitFeedback(feedbackKey: FeedbackOptions) {

    if (feedbackKey !== 'otimo') this.loadingMotivos = true;

    this.messageService.show();
    setTimeout(() => {
      this.messageService.hide();
    }, 800);
        
    this.store.feedback = {
      refeicao: this.store.refeicao,
      avaliacao: {
        ...this.store.feedback.avaliacao,
        [feedbackKey]: this.store.feedback.avaliacao[feedbackKey] + 1,
      }
    }

    let horarioId;
    await api.get('refeicao-horario/atual')
      .then(response => {
        horarioId = response.data.reho_id
      })
      .catch(err => console.log(err));

    this.feedbackRefeicaoService.submitFeedback({ 
      rere_reav_id: refeicao_avaliacao[feedbackKey],
      rere_refe_id: this.store.feedback.refeicao.id,
      rere_reho_id: 2
    }).then(response => {
      if(feedbackKey !== "otimo") {
        this.motivoAvaliacaoService.mostrar(response.data.rere_id);
        this.loadingMotivos = false;

        this.motivoAvaliacaoService.esconder(1000 * 12);
      }
    });
  }

  goToMenu() {
    this.router.navigate(['menu']);
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
  }

}
