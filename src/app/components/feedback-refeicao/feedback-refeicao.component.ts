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

  timer!: ReturnType<typeof setTimeout>;

  getFeedback(feedbackKey: FeedbackOptions) {

    if (this.messageService.visibility) {
      this.messageService.hide();
      clearTimeout(this.timer);
      return;
    }
        
    this.store.feedback = {
      refeicao: this.store.refeicao,
      avaliacao: {
        ...this.store.feedback.avaliacao,
        [feedbackKey]: this.store.feedback.avaliacao[feedbackKey] + 1,
      }
    }

    this.messageService.show();

    this.timer = setTimeout(() => {
      this.messageService.hide();
    }, 2000);
  }

  goToMenu() {
    this.router.navigate(['menu']);
  }

  ngOnInit(): void {}

}
