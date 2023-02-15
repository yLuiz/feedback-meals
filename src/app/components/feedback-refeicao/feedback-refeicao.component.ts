import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/store/store.service';
import { MessageService } from '../message/message.service';
import { FeedbackRefeicaoService } from './feedback-refeicao.service';
import { refeicao_avaliacao } from '../../interfaces/IRefeicaoResultado';
import { MotivoAvaliacaoService } from '../motivo-avaliacao/motivo-avaliacao.service';
import { FeedbackOptions } from 'src/app/types/types';


@Component({
  selector: 'app-feedback-refeicao',
  templateUrl: './feedback-refeicao.component.html',
  styleUrls: ['./feedback-refeicao.component.scss']
})
export class FeedbackRefeicaoComponent implements OnInit {
  

  constructor(
    public store: StoreService,
    private router: Router,
    private messageService: MessageService,
    private feedbackRefeicaoService: FeedbackRefeicaoService,
    public motivoAvaliacaoService: MotivoAvaliacaoService
  ) { }

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
        console.log(this.motivoAvaliacaoService.refeId);
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

  ngOnInit(): void {
    this.title = this.store.refeicao.nome;
  }

}
