import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import api from 'src/api/api';
import { refeicaoOpcao } from 'src/app/interfaces/IRefeicao';
import { RefeicaoService } from 'src/app/references/refeicao.service';
// import { refeicao } from 'src/app/references/refeicao';
import { StoreService } from 'src/app/store/store.service';
import { RefeicaoOpcoes, RefeicaoTexto, RefeicaoType } from 'src/app/types/types';
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
    private refeicaoService: RefeicaoService,
    private socket: Socket
  ) { }

  refeicao!: RefeicaoType;

  goToGraphic() {
    this.router.navigate(['/grafico']);
  }
  
  goToFeedback() {
    this.router.navigate(['/feedback']);
  }

  setMeal(option: RefeicaoOpcoes) {
    this.store.feedbackClear();
    // this.socket.emit('mudarRefeicao', { refeicao: option });

    const refeicaoPropriedades = {
      nome: refeicaoOpcao[option] as RefeicaoTexto,
      id: this.refeicao[option],
      horarioId: 0
    }

    this.store.refeicao = refeicaoPropriedades;
    this.store.feedback.refeicao = refeicaoPropriedades;

    this.goToFeedback();
  }

  ngOnInit(): void {
    this.socket.on('pegarRefeicao', (responsee: { refeicao: RefeicaoOpcoes, horarioId: number}) => {});
  }

}
