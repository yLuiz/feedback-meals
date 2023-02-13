import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/store/store.service';
import { MessageService } from '../message/message.service';
import { FeedbackRefeicaoService } from './feedback-refeicao.service';
import { refeicao_avaliacao, refeicao } from '../../interfaces/IRefeicaoResultado';

type FeedbackOptions = "otimo" | "bom" | "regular";

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
  ) { }

  timer!: ReturnType<typeof setTimeout>;
  title!: string;

  async submitFeedback(feedbackKey: FeedbackOptions) {
        
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
    console.log(this.store)
    this.title = this.store.refeicao.nome;
  }

}
