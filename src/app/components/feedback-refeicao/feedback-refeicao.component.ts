import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/store/store.service';


@Component({
  selector: 'app-feedback-refeicao',
  templateUrl: './feedback-refeicao.component.html',
  styleUrls: ['./feedback-refeicao.component.scss']
})
export class FeedbackRefeicaoComponent implements OnInit {

  constructor(
    public store: StoreService
  ) { }

  ngOnInit(): void {
  }

}
