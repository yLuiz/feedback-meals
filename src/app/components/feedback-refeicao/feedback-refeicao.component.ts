import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/store/store.service';
import { MessageService } from '../message/message.service';

type FeedbackOptions = "otimo" | "bom" | "regular" | "ruim";

@Component({
  selector: 'app-feedback-refeicao',
  templateUrl: './feedback-refeicao.component.html',
  styleUrls: ['./feedback-refeicao.component.scss']
})
export class FeedbackRefeicaoComponent implements OnInit {

  constructor(
    public store: StoreService,
    private router: Router,
    private messageService: MessageService
  ) { }

  getFeedback(feedbackKey: FeedbackOptions) {
    
    if (this.messageService.visibility) return;
    
    this.store.feedback = {
      refeicao: this.store.refeicao,
      avaliacao: {
        ...this.store.feedback.avaliacao,
        [feedbackKey]: this.store.feedback.avaliacao[feedbackKey] + 1,
      }
    }

    this.messageService.show();

    setTimeout(() => {
      this.messageService.hide();
    }, 3000);

    console.log(this.store.feedback);
  }

  goToMenu() {
    this.store.feedbackClear();
    this.router.navigate(['menu']);
  }

  ngOnInit(): void {}

}
