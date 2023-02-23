import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { mealsOption } from 'src/app/interfaces/IRefeicao';
import { refeicao } from 'src/app/references/refeicao';
import { StoreService } from 'src/app/store/store.service';
import { MealsOption, MealsText } from 'src/app/types/types';
import { MenuRefeicaoService } from './menu-refeicao.service';

@Component({
  selector: 'app-menu-refeicao',
  templateUrl: './menu-refeicao.component.html',
  styleUrls: ['./menu-refeicao.component.scss']
})
export class MenuRefeicaoComponent implements OnInit {

  constructor(
    private router: Router,
    private store: StoreService,
    private menuRefeicaoService: MenuRefeicaoService,
    private socket: Socket
  ) { }

  goToGraphic() {
    this.router.navigate(['/grafico']);
  }
  
  goToFeedback() {
    this.router.navigate(['/feedback']);
  }

  setMeal(option: MealsOption) {
    this.store.feedbackClear();
    this.socket.emit('mudarRefeicao', { refeicao: option });

    const refeicaoPropriedades = {
      nome: mealsOption[option] as MealsText,
      id: refeicao[option]
    }

    this.store.refeicao = refeicaoPropriedades;
    this.store.feedback.refeicao = refeicaoPropriedades;

    this.goToFeedback();
  }

  ngOnInit(): void {
    this.menuRefeicaoService.pegarTodasRefeicoes().then((reponse) => {
      reponse.data.map(refeicao => {});
    });
  }

}
