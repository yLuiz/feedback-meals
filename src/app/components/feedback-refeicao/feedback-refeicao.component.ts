import { Component, OnInit } from '@angular/core';

type Meals = "Dejejum" | "Almoço / Janta" | "Lanche";

@Component({
  selector: 'app-feedback-refeicao',
  templateUrl: './feedback-refeicao.component.html',
  styleUrls: ['./feedback-refeicao.component.scss']
})
export class FeedbackRefeicaoComponent implements OnInit {

  constructor() { }

  refeicao: Meals = 'Dejejum';

  ngOnInit(): void {
  }

}
