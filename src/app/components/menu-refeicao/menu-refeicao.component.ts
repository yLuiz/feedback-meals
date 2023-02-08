import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/store/store.service';

type IMealsOption = 'dejejum' | 'almoco' | 'lanche';
type MealsText = "Dejejum" | "Almoço / Janta" | "Lanche";

@Component({
  selector: 'app-menu-refeicao',
  templateUrl: './menu-refeicao.component.html',
  styleUrls: ['./menu-refeicao.component.scss']
})
export class MenuRefeicaoComponent implements OnInit {

  constructor(
    private router: Router,
    private store: StoreService
  ) { }

  mealsOption = {
    dejejum: 'Dejejum',
    almoco: 'Almoço / Janta',
    lanche: 'Lanche'
  }

  goToGraphic() {
    this.router.navigate(['/grafico']);
  }

  
  goToFeedback() {
    this.router.navigate(['/feedback']);
  }

  setMeal(option: IMealsOption) {
    this.store.feedbackClear();
    this.store.refeicao = this.mealsOption[option] as MealsText;
    this.goToFeedback();
  }

  ngOnInit(): void {}

}
